from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User, Group
from .models import Order, Product, Shipment, Truck, Employee


# ===================== EMPLOYEE SIGNAL =====================

@receiver(post_save, sender=User)
def create_employee_for_user(sender, instance, created, **kwargs):
    """Automatically create Employee when a user is added to the 'Employee' group."""
    if created and instance.groups.filter(name="Employee").exists():
        truck = Truck.objects.filter(is_available=True).first()  # Assign an available truck if any
        if truck:
            truck.is_available = False  # Mark truck as assigned
            truck.save()
        Employee.objects.create(user=instance, contact="Not Provided", truck=truck)


@receiver(post_save, sender=User)
def update_employee_for_user(sender, instance, **kwargs):
    """Ensure Employee model is updated when user is added to Employee group."""
    if instance.groups.filter(name="Employee").exists():
        employee, created = Employee.objects.get_or_create(user=instance)
        if created or not employee.truck:
            truck = Truck.objects.filter(is_available=True).first()
            if truck:
                truck.is_available = False
                truck.save()
                employee.truck = truck
            employee.save()


@receiver(post_delete, sender=Employee)
def make_truck_available(sender, instance, **kwargs):
    """Mark the truck as available when an Employee is deleted."""
    if instance.truck:
        instance.truck.is_available = True
        instance.truck.save()


# ===================== ORDER SIGNALS =====================

@receiver(pre_save, sender=Order)
def store_old_order_status(sender, instance, **kwargs):
    """Stores the old order status and quantity before saving."""
    try:
        old_order = Order.objects.get(pk=instance.pk)
        instance._old_status = old_order.status
        instance._old_required_qty = old_order.required_qty
    except Order.DoesNotExist:
        instance._old_status = None
        instance._old_required_qty = None


@receiver(post_save, sender=Order)
def update_product_required_quantity_on_save(sender, instance, created, **kwargs):
    """Updates total_required_quantity in Product when an Order is created or updated."""
    product = instance.product

    if created:
        if instance.status in ['pending', 'allocated']:
            product.total_required_quantity += instance.required_qty
    else:
        old_status = instance._old_status
        old_required_qty = instance._old_required_qty

        if old_status in ['pending', 'allocated'] and instance.status in ['delivered', 'cancelled']:
            product.total_required_quantity = max(0, product.total_required_quantity - old_required_qty)

        elif old_status in ['delivered', 'cancelled'] and instance.status in ['pending', 'allocated']:
            product.total_required_quantity += instance.required_qty

        elif old_status in ['pending', 'allocated'] and instance.status in ['pending', 'allocated']:
            quantity_difference = instance.required_qty - old_required_qty
            product.total_required_quantity = max(0, product.total_required_quantity + quantity_difference)

    product.save()


# ===================== SHIPMENT SIGNALS =====================

@receiver(post_save, sender=Shipment)
def update_truck_availability_on_shipment(sender, instance, created, **kwargs):
    """Updates truck availability based on shipment status."""
    
    truck = getattr(instance.employee, 'truck', None)

    if truck:
        if created and instance.status == 'in_transit':
            truck.is_available = False
        elif instance.status == 'delivered':
            # Check if all shipments of this truck are delivered
            all_delivered = not Shipment.objects.filter(employee=instance.employee, status='in_transit').exists()
            if all_delivered:
                truck.is_available = True

        truck.save()
