# Generated by Django 5.1.5 on 2025-02-14 16:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sonyapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='retailer',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='sonyapp.retailer'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='RetailerOrder',
        ),
    ]
