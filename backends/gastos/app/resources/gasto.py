from flask_restful import Resource, reqparse
from app.models.gasto import GastoModel
from flask_jwt import jwt_required
from datetime import datetime
import base64
import uuid


def saveImage(data, cedula):
    name = f"{cedula}_{uuid.uuid4()}.png"
    with open(name, "wb") as fh:
        fh.write(base64.b64decode(data))
    return name

class AddGasto(Resource):
    parser = reqparse.RequestParser()  # only allow price changes, no name changes allowed
    parser.add_argument('cedula', type=str, required=True, help='debe ser una cedula valida')
    parser.add_argument('fecha', type=lambda x: datetime.strptime(x,'%Y-%m-%d'), required=True, help="Debe ser una fecha en formato %Y-%m-%d")
    parser.add_argument('tipo', type=int, required=True, help='un numero en el rango [1,3]')
    parser.add_argument('valor', type=int, required=True, help='This field cannot be left blank')
    parser.add_argument('descripcion', type=str, required=True, help='texto no vacio')
    parser.add_argument('identificacion', type=str, required=True, help='texto base64')
    parser.add_argument('documento', type=str, required=True, help='texto base64')
    parser.add_argument('origen', type=str, required=True, help='texto no nulo')
    parser.add_argument('destino', type=str, required=True, help='texto no nulo')
    parser.add_argument('medio', type=str, required=True, help='texto no nulo')
    parser.add_argument('beneficiario_documento', type=str, required=True, help='texto no nulo')
    parser.add_argument('beneficiario_nombre', type=str, required=True, help='texto no nulo')
    parser.add_argument('beneficiario_telefono', type=str, required=True, help='texto no nulo')
    parser.add_argument('beneficiario_ciudad', type=str, required=True, help='texto no nulo')
    parser.add_argument('beneficiario_direccion', type=str, required=True, help='texto no nulo')
    parser.add_argument('beneficiario_placa', type=str, required=True, help='texto no nulo')
    parser.add_argument('foto_planilla', type=str, required=True, help='texto no nulo')
    parser.add_argument('origen_cuidad', type=str, required=True, help='texto no nulo')
    parser.add_argument('destino_ciudad', type=str, required=True, help='texto no nulo')
    parser.add_argument('origen_departamento', type=str, required=True, help='texto no nulo')
    parser.add_argument('destino_departamento', type=str, required=True, help='texto no nulo')

    @jwt_required()
    def post(self):
        data = AddGasto.parser.parse_args()
        data['identificacion'] = saveImage(data['identificacion'], data['cedula'])
        data['documento'] = saveImage(data['documento'], data['cedula'])
        if(data['foto_planilla']!=""): 
            data['foto_planilla'] = saveImage(data['foto_planilla'], data['cedula'])
        gasto = GastoModel(**data)
        gasto.save()

        return gasto.json(), 201

class Gastos(Resource):
    @jwt_required()
    def get(self):
        #print(GastoModel.query.all(), flush=True)
        return {'gastos': [gasto.json() for gasto in GastoModel.query.all()]}

class GastosEncuestador(Resource):
    @jwt_required()
    def get(self, cedula):
        return {'gastos': [gasto.json() for gasto in GastoModel.find_by_cedula(cedula)]}