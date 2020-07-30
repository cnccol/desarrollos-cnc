from flask_restful import Resource, reqparse
from app.models.gasto import GastoModel
from flask_jwt import jwt_required
from datetime import datetime


class AddGasto(Resource):
    parser = reqparse.RequestParser()  # only allow price changes, no name changes allowed
    parser.add_argument('cedula', type=str, required=True, help='debe ser una cedula valida')
    parser.add_argument('fecha', type=lambda x: datetime.strptime(x,'%Y-%m-%d'), required=True, help="Debe ser una fecha en formato %Y-%m-%d")
    parser.add_argument('tipo', type=int, required=True, help='This field cannot be left blank')
    parser.add_argument('valor', type=int, required=True, help='This field cannot be left blank')
    parser.add_argument('descripcion', type=str, required=True, help='debe ser una cedula valida')
    parser.add_argument('identificacion', type=str, required=True, help='debe ser una cedula valida')
    parser.add_argument('documento', type=str, required=True, help='debe ser una cedula valida')
    parser.add_argument('origen', type=str, required=True, help='debe ser una cedula valida')
    parser.add_argument('destino', type=str, required=True, help='debe ser una cedula valida')
    parser.add_argument('medio', type=str, required=True, help='debe ser una cedula valida')
    
    @jwt_required()
    def post(self):
        data = AddGasto.parser.parse_args()
        gasto = GastoModel(**data)
        gasto.save()

        return gasto.json(), 201