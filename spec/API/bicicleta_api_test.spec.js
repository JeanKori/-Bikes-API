var mongoose = require('mongoose');
var Bicicleta = require('../../models/bikes');
var request = require('request');//importar con "npm install request -save"
var server = require('../../bin/www');

var webUrl= 'http://localhost:3000/api/bicicletas';
var webUrl2= 'http://localhost:3000/api/bicicleta';

describe('API Bicicletas',()=>{
    beforeAll((done) => { mongoose.connection.close(done) });

    beforeEach(()=> {
        var mongoDB= 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Mongo connection error'));
        db.once('open', ()=>{
            console.log('We are connected to test database!');
        });
    });

    afterEach((done)=>{
        Bicicleta.deleteMany({}, (err, success)=> {
            if (err) console.log(err);
            done(); 
        });
    });

    describe("GET Bicicleta", () => {
      it("Status 200", (done) => {
        request.get(webUrl, function (error,Response,body) {
            if(error) console.log(error);
            var result = JSON.parse(body);
            expect(Response.statusCode).toBe(200); //Comprobamos que el status devuelto por la peticion sea el esperado
            expect(result.bicicletas.length).toBe(0); //Comprobamos que el tamaño del documento sea >0
            done();
        });
      });
    });

    describe('POST Bicicleta', ()=>{
        it('Status 200', (done)=>{
            var headers = {'content-type' : 'application/json'}; //indicamos la cabecera de la peticion
            var bike = '{"code":10, "Color": "rojo", "Modelo": "urbana", "Lat": -34, "Long": 12.45}';//inicamos el nuevo elemento a agregar
            request.post({
                headers: headers,
                url: webUrl2+'/create',
                body: bike
                },(error, response, body) => {
                    expect(response.statusCode).toBe(200);//verificamos que el status devuelto por la peticion sea el esperado
                    var result = JSON.parse(body).bicicleta;
                    console.log(result);
                    expect(result.color).toBe("rojo");
                    expect(result.ubicacion[0]).toBe(-34);
                    expect(result.ubicacion[1]).toBe(12.45);
                    done();
            });
        });
    });

    describe('PUT Bicicleta', ()=>{
        it('Status 200', (done)=>{
            //Agregamos un registro para tener registros para actualizar
            var newbike = Bicicleta.createInstance(1,'red','urbana',[12.1404590, -86.2290317]);
            
            Bicicleta.add(newbike,function(err,resp){
                var headers = {'content-type' : 'application/json'};
                var bike = '{"code":1, "Color": "black", "Modelo": "montañera", "Lat": -34, "Long": 12.45}';//le pasamos los atributos a actualizar
                request.put({
                    headers: headers,
                    url: webUrl2 +'/update',
                    body: bike
                }, (error, response, body) => {
                    if(error) console.log(error);
                        expect(response.statusCode).toBe(200);//verificamos que el status devuelto por la peticion sea el esperado
                        var result = JSON.parse(body).bicicleta;
                        console.log(result);
                        expect(result.color).toBe("black");
                        expect(result.modelo).toBe("montañera");//verificamos que los atributos que enviamos se hayan actualizado
                        done();
                });
            });

        });
    });

    describe('DELETE Bicicleta', ()=>{
         it('Status 204', (done)=>{
             //Agregamos un registro para tener algo que eliminar
             var newbike = Bicicleta.createInstance(1,'red','urbana',[12.1404590, -86.2290317]);
             Bicicleta.add(newbike, function(err, newBici){
                var headers = {'content-type' : 'application/json'};
                var bike = `{"code": ${newbike.code} }`;//le pasamos el code del elemento a eliminar  
                request.delete({
                    headers: headers,
                    url: webUrl2 +'/delete',
                    body: bike
                },(error, response, body) => {
                    if(error) console.log(error);
                    expect(response.statusCode).toBe(204);//verificamos que el status devuelto por la peticion sea el esperado
                    Bicicleta.allBicis(function(err,bicis){
                        expect(bicis.length).toBe(0);
                    });
                    done();
                });
             });
         });
    });

});