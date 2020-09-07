from flask_jwt import current_identity
from flask_restful import Resource, reqparse
from app.models.centro import CentroModel
from flask_jwt import jwt_required
from datetime import datetime
import base64
import uuid

class Centros(Resource):

    parser = reqparse.RequestParser()  # only allow price changes, no name changes allowed
    parser.add_argument('nombre', type=str, required=True, help='nombre valido')

    @jwt_required()
    def post(self):
        data = Centros.parser.parse_args()
        centro = CentroModel.find_by_name(data['nombre'])
        if not centro:
            centro = CentroModel(**data)
            centro.save()
        user = current_identity
        user.centros.append(centro)
        user.save()

        return centro.json(), 201

    @jwt_required()
    def get(self):
        #print(GastoModel.query.all(), flush=True)
        user = current_identity
        return {'centros': [centro.json() for centro in user.centros]}
