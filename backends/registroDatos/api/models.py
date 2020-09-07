from django.db import models
import uuid

class Persona(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    nombre = models.TextField(max_length=130, null=False, default='')

    apellido = models.TextField(max_length=130, null=False, default='')

    cedula = models.TextField(max_length=12, null=False, unique=True)
