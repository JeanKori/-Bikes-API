var mongoose = require('mongoose');
var Bicicleta = require('../../models/bikes');

// insatlar localmente "npm install --save-dev jasmine"
// inicializar con "npx jasmine innit"
// Para hacerlo globalmente revisar documentacion

describe('Testing Bicicletas',()=>{

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

    describe('Instancia Bicicletas',()=>{
        it('Creando nueva instacia',()=>{
            var bici = Bicicleta.createInstance(1,"verde","urbana",[-34.5, -54.1]);
        
            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(-34.5);
            expect(bici.ubicacion[1]).toEqual(-54.1);
        });
    });

    describe('Metodo de listado AllBicis',()=>{
        it('Comienza lista vacia',(done)=>{
            Bicicleta.allBicis(function(err,bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Metodo de Agregado',()=>{
        it('Agregando nuevo registro',(done)=>{
            var bici = new Bicicleta({code:1, color: "yellow", modelo: "urbana", ubicacion:[-34.5,-54.1]});
            Bicicleta.add(bici, function(err, newBici){
                if(err) console.log(err);
                Bicicleta.allBicis(function(err,bicis){
                    expect(bicis.length).toBe(1);
                    expect(bicis[0].ubicacion).toEqual(bici.ubicacion);
                    done();
                });
            });
        });
    });

    describe('Metodo de busqueda',()=>{
        it('busqueda por code 1',(done)=>{
            Bicicleta.allBicis(function(err,bicis){
                expect(bicis.length).toBe(0);

                var bici1 = new Bicicleta({code:1, color: "yellow", modelo: "urbana", ubicacion:[-34.5,-54.1]});
                Bicicleta.add(bici1, function(err, newBici){
                    if (err) console.log(err);

                    var bici2 = new Bicicleta({code:2, color: "green", modelo: "montañera", ubicacion:[34.5,54.1]});
                    Bicicleta.add(bici2, function(err, newBici){
                        if (err) console.log(err);

                        Bicicleta.findByCode(1, function(err,codebici){
                            Bicicleta.allBicis(function(err,bicis){
                                expect(bicis.length).toBe(2);
                            });
                            expect(codebici.code).toBe(bici1.code);
                            expect(codebici.color).toBe(bici1.color);
                            expect(codebici.modelo).toBe(bici1.modelo);
                            done();
                        });
                    });
                });
            });

        });
    });

    describe('Metodo de Actualizacion',()=>{
        it('Actualizar registro con code=2',(done)=>{
            var bici1 = new Bicicleta({code:1, color: "yellow", modelo: "urbana", ubicacion:[-34.5,-54.1]});
            Bicicleta.add(bici1, function(err, newBici){
                if (err) console.log(err);

                var bici2 = new Bicicleta({code:2, color: "green", modelo: "montañera", ubicacion:[34.5,54.1]});
                Bicicleta.add(bici2, function(err, newBici){
                    if (err) console.log(err);

                    Bicicleta.allBicis(function(err,bicis){
                        expect(bicis.length).toBe(2);
                    });
                    var codebici = ({code: 2, color: "red", modelo: "x12", ubicacion:[24.5,14.1]});
                        
                    Bicicleta.updateByCode(2,codebici,function(err,biciupdate){
                        if (err) console.log(err);

                        expect(biciupdate.code).toBe(codebici.code);
                        expect(biciupdate.color).toBe("red");
                        expect(biciupdate.modelo).toBe(codebici.modelo);
                        done();
                    });

                });
            });
        });
    });

});