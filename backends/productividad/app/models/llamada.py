from enum import Enum
from app import db

class Estado(Enum):
    COMPLETADA = 0
    RECHAZADA = 1
    INCOMPLETA = 2

class LlamadaModel(db.Model):


    __tablename__ = 'llamadas_test'

    id = db.Column(db.Integer, primary_key=True)
    fecha_realizada = db.Column(db.DateTime, default=db.func.current_timestamp())
    estudio_id = db.Column(db.Integer, db.ForeignKey('estudios_test.id'))
    realizada_por = db.Column(db.Integer, db.ForeignKey('encuestadores_test.id'))
    encuesta = db.relationship('EncuestaModel',backref='llamada', cascade="all, delete-orphan")

    def __init__(self, estudio, fecha, realizada_por):
        """Initialize the bucketlist with a name and its creator."""
        self.estudio_id = estudio
        self.fecha_realizada = fecha
        self.realizada_por = realizada_por

    def json(self):
        return {'fecha_realizada': self.fecha_realizada.strftime("%Y-%m-%d")}

    def save(self):
        """Save a bucketlist.
        This applies for both creating a new bucketlist
        and updating an existing onupdate
        """
        db.session.add(self)
        db.session.commit()

    # @classmethod
    # def find_by_encuestador(cls,encuestador_id):
    #     """This method gets all the bucketlists for a given user."""
    #     return cls.query.filter_by(realizada_por=encuestador_id)
    
    # @classmethod
    # def get_all_by_estudio(cls,encuestador_id, estudio):
    #     """This method gets all the bucketlists for a given user."""
    #     return cls.query.filter_by( realizada_por=user_id).filter_by(estudio=estudio)

    def delete(self):
        """Deletes a given bucketlist."""
        db.session.delete(self)
        db.session.commit()