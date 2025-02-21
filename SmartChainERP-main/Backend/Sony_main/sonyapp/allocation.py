from django.db import transaction
from rest_framework.response import Response
from .models import Order, Employee, Shipment, Product

def allocate_shipments(request):
    """
    Allocate shipments dynamically based on truck capacity, retailer distance, and product stock.
    """
    allocated_orders = []
    skipped_orders = []

    try:
        with transaction.atomic():
            orders = Order.objects.filter(status='pending').select_related('product', 'retailer').order_by('order_date')

            assigned_truck_ids = set(
                Shipment.objects.filter(status='in_transit').values_list('employee__truck__truck_id', flat=True)
            )

            available_employees = Employee.objects.exclude(truck__truck_id__in=assigned_truck_ids).select_related('truck')

            if not available_employees.exists():
                return Response({"error": "No available employees with trucks"}, status=400)

            truck_capacity_map = {emp.truck.truck_id: emp.truck.capacity for emp in available_employees}

            for order in orders:
                product = order.product
                retailer = order.retailer

                if not product or not retailer:
                    skipped_orders.append({"order_id": order.order_id, "reason": "Invalid product or retailer"})
                    continue

                if product.available_quantity < order.required_qty:
                    skipped_orders.append({"order_id": order.order_id, "reason": "Insufficient stock"})
                    continue

                employee = next(
                    (emp for emp in available_employees if truck_capacity_map.get(emp.truck.truck_id, 0) >= order.required_qty),
                    None
                )

                if not employee:
                    skipped_orders.append({"order_id": order.order_id, "reason": "No suitable truck available"})
                    continue

                truck = employee.truck  

                shipment = Shipment.objects.create(
                    order=order,
                    employee=employee,
                    status='in_transit'
                )

                product.available_quantity -= order.required_qty
                product.save()

                truck_capacity_map[truck.truck_id] -= order.required_qty

                order.status = 'allocated'
                order.save()

                allocated_orders.append({
                    "order_id": order.order_id,
                    "shipment_id": shipment.shipment_id,
                    "status": "allocated"
                })

        return Response({"allocated_orders": allocated_orders, "skipped_orders": skipped_orders})

    except Exception as e:
        return Response({"error": str(e)}, status=500)