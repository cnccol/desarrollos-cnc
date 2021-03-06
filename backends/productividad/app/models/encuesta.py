from app import db
from datetime import datetime

class EncuestaModel(db.Model):

    __tablename__ = 'encuestas_test'

    id = db.Column(db.Integer, primary_key=True)
    fecha_realizada = db.Column(db.DateTime, default=db.func.current_timestamp())
    estudio_id = db.Column(db.Integer, db.ForeignKey('estudios_test.id'))
    realizada_por = db.Column(db.Integer, db.ForeignKey('encuestadores_test.id'))
    llamada_id = db.Column(db.Integer, db.ForeignKey('llamadas_test.id'))

    def __init__(self, estudio, fecha, realizada_por, llamada):
        """Initialize the bucketlist with a name and its creator."""
        self.estudio_id = estudio
        self.fecha_realizada = fecha
        self.realizada_por = realizada_por
        self.llamada_id = llamada

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