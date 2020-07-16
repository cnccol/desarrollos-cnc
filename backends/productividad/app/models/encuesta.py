from app import db

class EncuestaModel(db.Model):

    __tablename__ = 'encuestas_test'

    id = db.Column(db.Integer, primary_key=True)
    estudio = db.Column(db.Integer)
    fecha_realizada = db.Column(db.DateTime, default=db.func.current_timestamp())
    realizada_por = db.Column(db.Integer, db.ForeignKey('encuestadores_test.id'))

    def __init__(self, estudio, fecha, realizada_por):
        """Initialize the bucketlist with a name and its creator."""
        self.estudio = estudio
        self.fecha_realizada = fecha
        self.realizada_por = realizada_por

    def save(self):
        """Save a bucketlist.
        This applies for both creating a new bucketlist
        and updating an existing onupdate
        """
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all(cls,encuestador_id):
        """This method gets all the bucketlists for a given user."""
        return cls.query.filter_by(realizada_por=user_id)
    
    @staticmethod
    def get_all_by_estudio(cls,encuestador_id, estudio):
        """This method gets all the bucketlists for a given user."""
        return cls.query.filter_by( realizada_por=user_id).filter_by(estudio=estudio)

    def delete(self):
        """Deletes a given bucketlist."""
        db.session.delete(self)
        db.session.commit()