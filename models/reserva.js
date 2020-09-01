var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var reservaSchema = new Schema({
    desde: Date,
    hasta: Date,
    bicicleta: {type: mongoose.Schema.Types.ObjectId, ref: 'bicicletas'},
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'usuario'}
});

reservaSchema.methods.DiasdeReserva= function(){
    return moment(this.hasta).diff(moment(this.desde),'days')+ 1;
};

module.exports = mongoose.model('reserva', reservaSchema);