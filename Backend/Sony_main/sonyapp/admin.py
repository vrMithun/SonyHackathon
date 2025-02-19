from django.contrib import admin
from .models import Category, Product, Retailer, Order, Employee, Truck, Shipment

# ✅ Category Admin
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

# ✅ Product Admin
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'available_quantity', 'total_required_quantity', 'status')
    search_fields = ('name',)
    list_filter = ('status',)

# ✅ Order Admin
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'retailer', 'product', 'required_qty', 'status', 'order_date')
    search_fields = ('product__name', 'retailer__name')
    list_filter = ('status', 'order_date')

# ✅ Employee Admin
@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('employee_id', 'name', 'get_role')  # Use method to get role
    search_fields = ('name',)

    @admin.display(description='Role')
    def get_role(self, obj):
        return obj.role if hasattr(obj, 'role') else 'N/A'  # Handle missing field safely

# ✅ Retailer Admin
@admin.register(Retailer)
class RetailerAdmin(admin.ModelAdmin):
    list_display = ('retailer_id', 'name', 'address')
    search_fields = ('name', 'address')

# ✅ Truck Admin
@admin.register(Truck)
class TruckAdmin(admin.ModelAdmin):
    list_display = ('truck_id', 'license_plate', 'capacity', 'get_is_available')  # Use method to get availability
    search_fields = ('license_plate',)

    @admin.display(description='Available')
    def get_is_available(self, obj):
        return obj.is_available if hasattr(obj, 'is_available') else False  # Handle missing field safely

# ✅ Shipment Admin
@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display = ('shipment_id', 'order', 'employee', 'status', 'shipment_date')
    search_fields = ('order__order_id', 'employee__name')
    list_filter = ('status', 'shipment_date')