# Generated by Django 3.1.4 on 2020-12-14 15:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('prestamo', '0006_auto_20201214_1048'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prestamo',
            name='libro',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prestamo.libro'),
        ),
    ]