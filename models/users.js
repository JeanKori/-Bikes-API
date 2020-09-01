var reserva = require('./reserva');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombres: String,
    apellidos: String,
    telefono: Number
});

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reservacion = new reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta});
    console.log(reservacion);
    reservacion.save(cb);
}

module.exports = mongoose.model('usuario',usuarioSchema);
