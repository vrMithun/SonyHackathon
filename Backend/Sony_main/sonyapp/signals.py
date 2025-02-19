from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from .models import Order, Product, Shipment, Truck

# ===================== ORDER SIGNALS =====================

@receiver(pre_save, sender=Order)
def store_old_order_status(sender, instance, **kwargs):
    """Stores the old order status and quantity before saving"""
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

        if old_status in ['pending', 'allocated'] and instance.status in ['delivered', 'canceled']:
            product.total_required_quantity = max(0, product.total_required_quantity - old_required_qty)

        elif old_status in ['delivered', 'canceled'] and instance.status in ['pending', 'allocated']:
            product.total_required_quantity += instance.required_qty

        elif old_status in ['pending', 'allocated'] and instance.status in ['pending', 'allocated']:
            quantity_difference = instance.required_qty - old_required_qty
            product.total_required_quantity = max(0, product.total_required_quantity + quantity_difference)

    product.save()

@receiver(post_delete, sender=Order)
def update_product_required_quantity_on_delete(sender, instance, **kwargs):
    """Subtract required_qty from total_required_quantity when an order is deleted."""
    if instance.status in ['pending', 'allocated']:
        product = instance.product
        product.total_required_quantity = max(0, product.total_required_quantity - instance.required_qty)
        product.save()

@receiver(post_save, sender=Order)
@receiver(post_delete, sender=Order)
def update_product_status(sender, instance, **kwargs):
    """Update the product status when an order is created, updated, or deleted."""
    product = instance.product
    product.update_status()

# ===================== SHIPMENT SIGNALS =====================

@receiver(pre_save, sender=Shipment)
def store_old_shipment_status(sender, instance, **kwargs):
    """Stores the old shipment status before saving"""
    try:
        old_shipment = Shipment.objects.get(pk=instance.pk)
        instance._old_status = old_shipment.status
    except Shipment.DoesNotExist:
        instance._old_status = None

@receiver(post_save, sender=Shipment)
def update_product_required_quantity_on_shipment(sender, instance, **kwargs):
    """Reduces total_required_quantity in Product when a Shipment is marked as 'delivered'."""
    old_status = instance._old_status
    if old_status == 'in_transit' and instance.status == 'delivered':
        product = instance.order.product
        product.total_required_quantity = max(0, product.total_required_quantity - instance.order.required_qty)
        product.save()

@receiver(post_save, sender=Shipment)
def update_order_status_on_shipment(sender, instance, **kwargs):
    """Updates the Order status when all shipments for the order are delivered."""
    if instance.status == 'delivered':
        order = instance.order
        all_shipments_delivered = not Shipment.objects.filter(order=order, status__in=['in_transit', 'pending']).exists()

        if all_shipments_delivered:
            order.status = 'delivered'
            order.save()

@receiver(post_save, sender=Shipment)
def update_truck_availability_on_shipment(sender, instance, created, **kwargs):
    """Updates truck availability based on shipment status."""
    
    # Check if truck is linked via Employee
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
