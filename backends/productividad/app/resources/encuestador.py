from flask_restful import Resource, reqparse
from app.models.encuestador import EncuestadorModel


class Encuestador(Resource):
    parser = reqparse.RequestParser()  # only allow price changes, no name changes allowed
    parser.add_argument('nombre', type=str, required=True, help='This field cannot be left blank')
    parser.add_argument('apellido', type=str, required=True, help='Must enter the store id')

    def get(self, cedula):
        encuestador = EncuestadorModel.find_by_cedula(cedula)
        if encuestador:
            return encuestador.json()
        return {'message': 'Encuestador not found'}, 404

    def post(self, cedula):
        if EncuestadorModel.find_by_cedula(cedula):
            return {'message': "An encuestadro with cedula '{}' already exists.".format(cedula)}, 400

        data = Encuestador.parser.parse_args()
        encuestador = EncuestadorModel(cedula, data['nombre'], data['apellido'])

        try:
            encuestador.save_to_db()
        except:
            return {"message": "An error occurred inserting the encuestador."}, 500
        return encuestador.json(), 201

    def delete(self, cedula):

        encuestador = EncuestadorModel.find_by_cedula(cedula)
        if encuestador:
            encuestador.delete_from_db()
            return {'message': 'item has been deleted'}
        else:
            return {'message': 'no such encuestador'}


class Encuestadores(Resource):
    def get(self):
        return {'encuestadores': [encuestador.json() for encuestador in EncuestadorModel.query.all()]}