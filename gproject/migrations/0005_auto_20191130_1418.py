# Generated by Django 2.2.6 on 2019-11-30 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gproject', '0004_auto_20191130_1415'),
    ]

    operations = [
        migrations.AlterField(
            model_name='elaborationsettings',
            name='range_from',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='elaborationsettings',
            name='range_to',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
