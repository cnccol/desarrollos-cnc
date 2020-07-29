from flask_restful import Resource, reqparse
from app.models.estudio import EstudioModel
from datetime import datetime


class Estudio(Resource):
    parser = reqparse.RequestParser()  # only allow price changes, no name changes allowed
    parser.add_argument('centro_costos', type=str, required=True, help='This field cannot be left blank')
    parser.add_argument('muestra', type=int, required=True, help='Debe ser una valor mayor a 0')
    parser.add_argument('fecha_inicio', type=lambda x: datetime.strptime(x,'%Y-%m-%d'), required=True, help="Debe ser una fecha en formato %Y-%m-%d")
    parser.add_argument('fecha_entrega', type=lambda x: datetime.strptime(x,'%Y-%m-%d'), required=True, help="Debe ser una fecha en formato %Y-%m-%d")

    def get(self, nombre):
        estudio = EstudioModel.find_by_nombre(nombre)
        if estudio:
            return estudio.json()
        return {'message': 'Estudio not found'}, 404

    def post(self, nombre):
        if EstudioModel.find_by_nombre(nombre):
            return {'message': "An estudio with nombre '{}' already exists.".format(nombre)}, 400

        data = Estudio.parser.parse_args()
        print(data,flush=True)
        estudio = EstudioModel(nombre,data['centro_costos'],data['muestra'],data['fecha_inicio'],data['fecha_entrega'])

        try:
            estudio.save()
            return estudio.json(), 201
        except Exception as e:
            print(e)
            return {"message": "An error occurred inserting the estudio."}, 500
        

    def delete(self, cedula):

        estudio = EstudioModel.find_by_nombre(nombre)
        if estudio:
            estudio.delete()
            return {'message': 'estudio has been deleted'}
        else:
            return {'message': 'no such estudio'}


class Estudios(Resource):
    def get(self):
        return {'estudios': [estudio.json() for estudio in EstudioModel.query.all()]}