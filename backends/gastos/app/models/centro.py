from app import db
from werkzeug.security import generate_password_hash

class CentroModel(db.Model):
    __tablename__ = 'centros'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), unique=True, nullable = False)

    def __init__(self, nombre):
        self.nombre = nombre

    def save(self):
        db.session.add(self)
        db.session.commit()

    def json(self):
        return {
            'id': self.id,
            'nombre': self.nombre
            }

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(nombre=name).first()