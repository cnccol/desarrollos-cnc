from app import db
from datetime import datetime

class GastoModel(db.Model):

    __tablename__ = 'gastos'

    """
        datos basicos del gasto
    """
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    fecha_subido = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    cedula = db.Column(db.String(80), nullable=False)
    tipo = db.Column(db.Integer, nullable=False)
    valor = db.Column(db.Integer, nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)

    """
        datos del beneficiario
    """
    beneficiario_documento = db.Column(db.String(80), nullable=False)
    beneficiario_nombre = db.Column(db.String(255), nullable=False)
    beneficiario_telefono = db.Column(db.String(80), nullable=False)
    beneficiario_ciudad = db.Column(db.String(80), nullable=False)
    beneficiario_direccion  = db.Column(db.String(100), nullable=True)
    beneficiario_placa = db.Column(db.String(10),nullable=True)


    """
        documentos de soporte
    """
    identificacion = db.Column(db.String(120), nullable=False)
    documento = db.Column(db.String(120), nullable=False)
    foto_planilla = db.Column(db.String(120), nullable=True)

    """
        datos de transporte
    """
    origen = db.Column(db.String(255), nullable=True)
    destino = db.Column(db.String(255), nullable=True)
    origen_ciudad = db.Column(db.String(255), nullable=True)
    destino_ciudad = db.Column(db.String(255), nullable=True)
    origen_departamento = db.Column(db.String(255), nullable=True)
    destino_departamento = db.Column(db.String(255), nullable=True)
    medio = db.Column(db.String(255), nullable=True)

    """
        datos aprobacion
    """
    aprobado = db.Column(db.Boolean, default=False, nullable=False)

    def __init__(self, cedula, fecha, tipo, valor, descripcion,
        identificacion, documento, origen, destino, medio, beneficiario_ciudad,
        beneficiario_documento, beneficiario_direccion, beneficiario_nombre,
        beneficiario_placa, beneficiario_telefono, foto_planilla, origen_ciudad,
        origen_departamento,destino_ciudad, destino_departamento):

        """Inicializar un gasto"""

        """
            datos basicos del gasto
        """
        self.cedula = cedula
        self.fecha = fecha
        self.tipo = tipo
        self.valor = valor
        self.descripcion = descripcion

        """
            datos del beneficiario
        """
        self.beneficiario_documento = beneficiario_documento
        self.beneficiario_nombre = beneficiario_nombre
        self.beneficiario_telefono = beneficiario_telefono
        self.beneficiario_ciudad = beneficiario_ciudad
        self.beneficiario_direccion  = beneficiario_direccion
        self.beneficiario_placa = beneficiario_placa

        """
            documentos de soporte
        """
        self.identificacion = identificacion
        self.documento = documento
        self.foto_planilla = foto_planilla

        """
            datos transporte
        """
        self.origen = origen
        self.destino = destino
        self.medio = medio
        self.origen_cuidad = origen_ciudad
        self.destino_ciudad = destino_ciudad
        self.origen_departamento = origen_departamento
        self.destino_departamento = destino_departamento

    def json(self):
        return {
            'id': self.id,
            'cedula': self.cedula,
            'fecha': self.fecha.strftime("%Y-%m-%d"),
            'fecha_subido': self.fecha_subido.strftime("%Y-%m-%d"),
            'valor': self.valor,
            'descripcion': self.descripcion,
            'identificacion': self.identificacion,
            'documento': self.documento,
            'origen': self.origen,
            'destino': self.destino,
            'medio': self.medio,
            'aprobado': self.aprobado
            }

    def save(self):
        """Save a bucketlist.
        This applies for both creating a new bucketlist
        and updating an existing onupdate
        """
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_cedula(cls,cedula):
         """This method gets all the bucketlists for a given user."""
         return cls.query.filter_by(cedula=cedula).all()

    def delete(self):
        """Deletes a given bucketlist."""
        db.session.delete(self)
        db.session.commit()