from app import db
from datetime import datetime

class GastoModel(db.Model):

    __tablename__ = 'gastos'

    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    fecha_subido = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    cedula = db.Column(db.String(80), nullable=False)
    tipo = db.Column(db.Integer, nullable=False)
    valor = db.Column(db.Integer, nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)
    identificacion = db.Column(db.String(120), nullable=False)
    documento = db.Column(db.String(120), nullable=False)
    origen = db.Column(db.String(255), nullable=True)
    destino = db.Column(db.String(255), nullable=True)
    medio = db.Column(db.String(255), nullable=True)
    aprobado = db.Column(db.Boolean, default=False, nullable=False)

    def __init__(self, cedula, fecha, tipo, valor, descripcion, identificacion, documento, origen=None, destino=None, medio=None):
        """Initialize the bucketlist with a name and its creator."""
        self.cedula = cedula
        self.fecha = fecha
        self.tipo = tipo
        self.valor = valor
        self.descripcion = descripcion
        self.identificacion = identificacion
        self.documento = documento
        if self.tipo==2:
            self.origen = origen
            self.destino = destino
            self.medio = medio

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