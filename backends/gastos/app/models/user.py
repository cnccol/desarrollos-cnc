from app import db
from werkzeug.security import generate_password_hash
#from app.models import CentroModel

centros = db.Table('centros_usuarios',
    db.Column('centro_id', db.Integer, db.ForeignKey('centros.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password = db.Column(db.String(255))
    centros = db.relationship('CentroModel', secondary=centros)

    def __init__(self, username, password):
        hashed_password = generate_password_hash(password, method='sha256')
        self.username = username
        self.password = hashed_password

    def save(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()