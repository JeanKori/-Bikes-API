var mongoose = require('mongoose');
var Bicicleta = require('../../models/bikes');
var Usuario = require('../../models/users');
var Reserva = require('../../models/reserva');

describe('Testing de usuarios',()=>{

    beforeEach(function(done){
        var mongoDB= 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Mongo connection error'));
        db.once('open', ()=>{
            console.log('We are connected to test database!');
            done();
        });
    });

    afterEach((done)=>{
        Reserva.deleteMany({}, (err, success)=> {
            if (err) console.log(err);
            Usuario.deleteMany({}, (err, success)=> {
                if (err) console.log(err);
                Bicicleta.deleteMany({}, (err, success)=> {
                    if (err) console.log(err);
                    done(); 
                });
            });
        });
    });

    describe('Accion: Un usario realiza reserva de una bici',()=>{
        it('debe de registrarse la reserva',(done)=>{
            const user = new Usuario({nombres: 'Jean Carlos', apellidos: 'Ruiz Chamorro', telefono: 895});
            user.save();
            const bici = new Bicicleta({code:1, color: "yellow", modelo: "urbana", ubicacion:[-34.5,-54.1]});
            bici.save();

            var hoy= new Date();
            var mañana= new Date();
            mañana.setDate(hoy.getDate()+1);
            user.reservar(bici.id,hoy,mañana,function(err,reserva){
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err,reservas){
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].DiasdeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombres).toBe(user.nombres);
                    done();
                });
            });

        });
    });

});