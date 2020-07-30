from app import db
from datetime import datetime

class EstudioModel(db.Model):

    __tablename__ = 'estudios_test'

    id = db.Column(db.Integer, primary_key=True)
    centro_costos = db.Column(db.String(80))
    nombre = db.Column(db.String(80))
    muestra = db.Column(db.Integer)
    fecha_inicial = db.Column(db.DateTime, default=db.func.current_timestamp())
    fecha_entrega = db.Column(db.DateTime, default=db.func.current_timestamp())
    llamadas = db.relationship('LlamadaModel',backref='estudio', cascade="all, delete-orphan")
    encuestas = db.relationship('EncuestaModel',backref='estudio', cascade="all, delete-orphan")

    def __init__(self, nombre, centro_costos, muestra, fecha_inicial, fecha_entrega):
        """Initialize the bucketlist with a name and its creator."""
        self.nombre = nombre
        self.centro_costos = centro_costos,
        self.muestra = muestra,
        self.fecha_inicial = fecha_inicial
        self.fecha_entrega = fecha_entrega

    def json(self):
        return {'nombre': self.nombre,
        'centro_costos': self.centro_costos,
        'fecha_inicial': self.fecha_inicial.strftime("%Y-%m-%d"),
        'fecha_entrega': self.fecha_entrega.strftime("%Y-%m-%d"),
        'muestra': self.muestra,
        'llamadas': [llamada.json() for llamada in self.llamadas],
        'encuestas': [encuesta.json() for encuesta in self.encuestas]
        }

    def save(self):
        """Save a bucketlist.
        This applies for both creating a new bucketlist
        and updating an existing onupdate
        """
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_nombre(cls,nombre):
        """This method gets all the bucketlists for a given user."""
        return cls.query.filter_by(nombre=nombre).first()

    @classmethod
    def find_by_centro(cls, centro_costos):
        return cls.query.filter_by(centro_costos=centro_costos).first()

    def delete(self):
        """Deletes a given bucketlist."""
        db.session.delete(self)
        db.session.commit()