# Generated by Django 2.2.6 on 2019-12-02 10:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gproject', '0010_listdb_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='elaborationsettings',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_elaboration_settings', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='ElaborationSettingsGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_name', models.CharField(max_length=100, unique=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_elaboration_settings_group', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
