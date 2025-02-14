from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from .models import Order, Product

@receiver(pre_save, sender=Order)
def track_old_required_qty(sender, instance, **kwargs):
    """Store the previous required_qty before updating an order."""
    if instance.pk:  # If the order exists, track the old quantity
        try:
            instance._old_required_qty = Order.objects.select_related('product').get(pk=instance.pk).required_qty
        except Order.DoesNotExist:
            instance._old_required_qty = 0  # Fallback for safety
    else:
        instance._old_required_qty = 0  # New order case

@receiver(post_save, sender=Order)
def update_product_total_required_on_save(sender, instance, created, **kwargs):
    """Update total required quantity when an order is created or updated."""
    product = instance.product
    change_in_qty = instance.required_qty - instance._old_required_qty

    if change_in_qty != 0:  # Avoid unnecessary updates
        product.total_required_quantity += change_in_qty
        product.save(update_fields=['total_required_quantity'])

@receiver(post_delete, sender=Order)
def update_product_total_required_on_delete(sender, instance, **kwargs):
    """Reduce total required quantity when an order is deleted."""
    product = instance.product
    if instance.required_qty > 0:  # Ensure the value is valid
        product.total_required_quantity -= instance.required_qty
        product.save(update_fields=['total_required_quantity'])
