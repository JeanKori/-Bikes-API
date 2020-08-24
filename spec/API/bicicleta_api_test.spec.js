var Bicicleta = require('../../models/bikes');
var request = require('request');//importar con "npm install request -save"
var server = require('../../bin/www');

beforeEach( ()=> { Bicicleta.allBicis = []; });//metodo que proporciona jasmine--indica la ejecucion antes de cada test

describe('API Bicicletas', ()=>{

    // Listado
    describe('GET Bicicleta', ()=>{
        it('Status 200', ()=>{
            expect(Bicicleta.allBicis.length).toBe(0);//En un comienzo no hay registros

            //Agremamos para confirmar que se pueda listar por lo menos un registro
            var bike = new Bicicleta('1','red','urbana',[12.1404590, -86.2290317]);
            Bicicleta.add(bike);


            request.get('http://localhost:3000/api/bicicletas', function(error, Response, body){
                expect(Response.statusCode).toBe(200);//Comprobamos que el status devuelto por la peticion sea el esperado
            });
        });
    });

    // Creacion 
    describe('POST Bicicleta', ()=>{
        it('Status 200', (done)=>{
            var headers = {'content-type' : 'application/json'}; //indicamos la cabecera de la peticion
            var bike = '{"id":10, "Color": "rojo", "Modelo": "urbana", "Lat": -34, "Long": 12.45}';//inicamos el nuevo elemento a agregar
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicleta/create',
                body: bike
                }, (error, Response, body) => {
                    expect(Response.statusCode).toBe(200);//verificamos que el status devuelto por la peticion sea el esperado
                    expect(Bicicleta.findByID(10).color).toBe("rojo");//que el atributo color corresponda con el nuevo registro
                    done();
            });
        });
    });

    // Actualizado
    describe('PUT Bicicleta', ()=>{
        it('Status 200', (done)=>{
            //Agregamos un registro para tener registros para actualizar
            var newbike = new Bicicleta('1','red','urbana',[12.1404590, -86.2290317]);
            Bicicleta.add(newbike);

            var headers = {'content-type' : 'application/json'};
            var bike = '{"id": 1, "Color": "negro", "Modelo": "montañera", "Lat":12.555, "Long": 50.50}';//le pasamos los atributos a actualizar
            request.put({
                headers: headers,
                url: 'http://localhost:3000/api/bicicleta/update',
                body: bike
                }, (error, response, body) => {
                    expect(response.statusCode).toBe(200);//verificamos que el status devuelto por la peticion sea el esperado
                    expect(Bicicleta.findByID(1).modelo).toBe("montañera");//verificamos que los atributos que enviamos se hayan actualizado
                    done();
            });
        });
    });

    // Eliminado
    describe('DELETE Bicicleta', ()=>{
        it('Status 204', (done)=>{
            //Agregamos un registro para tener algo que eliminar
            var newbike = new Bicicleta('1','red','urbana',[12.1404590, -86.2290317]);
            Bicicleta.add(newbike);

            var headers = {'content-type' : 'application/json'};
            var bike = `{"id": ${newbike.id} }`;//le pasamos el id del elemento a eliminar
            request.delete({
                headers: headers,
                url: 'http://localhost:3000/api/bicicleta/delete',
                body: bike
                }, (error, response, body) => {
                    expect(response.statusCode).toBe(204);//verificamos que el status devuelto por la peticion sea el esperado
                    expect(Bicicleta.allBicis.length).toBe(0);//verificamos que efectivamente no hay registros
                    done();
            });
        });
    });

});