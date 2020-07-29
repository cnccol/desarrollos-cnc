from flask_restful import Resource, reqparse
from app.models.encuesta import EncuestaModel
from app.models.encuestador import EncuestadorModel
from app.models.estudio import EstudioModel
from datetime import datetime


class Encuesta(Resource):
    parser = reqparse.RequestParser()  # only allow price changes, no name changes allowed
    #parser.add_argument('estudio', type=int, required=True, help='This field cannot be left blank')
    parser.add_argument('fecha', type=lambda x: datetime.strptime(x,'%Y-%m-%d'), required=True, help="Debe ser una fecha en formato %Y-%m-%d")
    #()
    

    def post(self, cedula, nombre_estudio):
        encuestador = EncuestadorModel.find_by_cedula(cedula)
        estudio = EstudioModel.find_by_nombre(nombre_estudio)
        if encuestador and estudio:
            data = Encuesta.parser.parse_args()
            encuesta = EncuestaModel(estudio.id, data['fecha'], encuestador.id)
            
            try:
                encuesta.save()
            except:
                return {"message": "Error al insertar la encuesta"}, 500
            return encuesta.json(), 201

        return {'message': 'No existe encuestador con la cedula dada o el estudio con el nombre dado'}, 404
        # if EncuestadorModel.find_by_cedula(cedula):
        #     return {'message': "An encuestadro with cedula '{}' already exists.".format(cedula)}, 400

        # data = Encuestador.parser.parse_args()
        # encuestador = EncuestadorModel(cedula, data['nombre'], data['apellido'])

        # try:
        #     encuestador.save_to_db()
        # except:
        #     return {"message": "An error occurred inserting the encuestador."}, 500
        # return encuestador.json(), 201

    # def delete(self, cedula):

    #     encuestador = EncuestadorModel.find_by_cedula(cedula)
    #     if encuestador:
    #         encuestador.delete_from_db()
    #         return {'message': 'item has been deleted'}
    #     else:
    #         return {'message': 'no such encuestador'}


class Encuestas(Resource):
    def get(self, cedula):
        return {'encuestas': [encuesta.json() for encuesta in EncuestaModel.query.all()]}
    # def get_all(self):
    #     return {'encuestadores': [encuestador.json() for encuestador in EncuestadorModel.query.all()]}