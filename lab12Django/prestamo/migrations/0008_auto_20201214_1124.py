# Generated by Django 3.1.4 on 2020-12-14 16:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('prestamo', '0007_auto_20201214_1053'),
    ]

    operations = [
        migrations.AlterField(
            model_name='libro',
            name='autor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='libros', to='prestamo.autor'),
        ),
    ]
