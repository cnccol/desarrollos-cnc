from flask import Flask
from flask_restful import Api
from flask_jwt import JWT
from flask_sqlalchemy import SQLAlchemy


from app.config import postgresqlConfig

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = postgresqlConfig
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'Dese.Decent.Pups.BOOYO0OST'
api = Api(app)

db = SQLAlchemy()
db.init_app(app)

from app.resources.user import UserRegister
from app.resources.gasto import AddGasto, Gastos, GastosEncuestador
from app.security import authenticate, identity

@app.before_first_request
def create_tables():
    db.create_all()

jwt = JWT(app, authenticate, identity)  # Auto Creates /auth endpoint

api.add_resource(UserRegister, '/register')
api.add_resource(AddGasto, '/gasto')
api.add_resource(Gastos, '/gastos')
api.add_resource(GastosEncuestador,'/gastos/<string:cedula>')


