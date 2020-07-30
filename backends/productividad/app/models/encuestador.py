from app import db

class EncuestadorModel(db.Model):

    __tablename__ = 'encuestadores_test'

    id = db.Column(db.Integer, primary_key=True)
    cedula = db.Column(db.String(80))
    nombre = db.Column(db.String(80))
    apellido = db.Column(db.String(80))

    encuestas = db.relationship('EncuestaModel',backref='encuestador', cascade="all, delete-orphan")


    def __init__(self, cedula, nombre, apellido):
        self.cedula = cedula
        self.nombre = nombre
        self.apellido = apellido

    def json(self):
        return {'cedula': self.cedula, 'nombre': self.nombre, 'apellido': self.apellido, 'encuestas': [encuesta.json() for encuesta in self.encuestas]}

    def get_id(self):
        return self.id

    @classmethod
    def find_by_cedula(cls, cedula):
        return cls.query.filter_by(cedula=cedula).first()  # simple TOP 1 select

    def save_to_db(self):  # Upserting data
        db.session.add(self)
        db.session.commit()  # Balla

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()