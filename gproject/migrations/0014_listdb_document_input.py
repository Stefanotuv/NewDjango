# Generated by Django 2.2.6 on 2019-12-04 20:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gproject', '0013_auto_20191204_1944'),
    ]

    operations = [
        migrations.AddField(
            model_name='listdb',
            name='document_input',
            field=models.FileField(blank=True, null=True, upload_to='static/documents/'),
        ),
    ]