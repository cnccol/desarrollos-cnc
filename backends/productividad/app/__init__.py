from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

from app.config import postgresqlConfig
#from resources.item import Item, ItemList

#from resources.user import UserRegister
#from security import authenticate, identity

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = postgresqlConfig
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'Dese.Decent.Pups.BOOYO0OST'
api = Api(app)

db = SQLAlchemy()
db.init_app(app)

from app.resources.encuestador import Encuestador, Encuestadores

@app.before_first_request
def create_tables():
    db.create_all()

#jwt = JWT(app, authenticate, identity)  # Auto Creates /auth endpoint

# api.add_resource(Item, '/item/<string:name>')
# api.add_resource(ItemList, '/items')
# api.add_resource(UserRegister, '/register')
api.add_resource(Encuestador, '/encuestador/<string:cedula>')
api.add_resource(Encuestadores, '/encuestadores')


