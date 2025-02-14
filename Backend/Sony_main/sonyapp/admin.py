from django.contrib import admin
from .models import Category, Product, Retailer, Order, Employee, Truck, Shipment

# Register models
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Retailer)
admin.site.register(Order)
admin.site.register(Employee)
admin.site.register(Truck)
admin.site.register(Shipment)
