var reserva = require('./reserva');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uniquevalidator = require('mongoose-unique-validator');

const bcrypt = require('bcryptjs'); //npm install bcryptjs --save
const saltRounds= bcrypt.genSaltSync(10);

const validaemail= ((email)=>{ //implementacion de Expresiones Regulares (REGUEX)
    const valida = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return valida.test(email);
});

var usuarioSchema = new Schema({
    nombres: {
        type: String,
        trim: true,
        required: [true, "El campo nombre es obligatorio."]
    },
    apellidos: {
        type: String,
        trim: true,
        required: [true, "El campo apellido es obligatorio."]
    },
    telefono: {
        type:Number,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        required: [true, "El email es obligatorio"],
        lowercase: true,
        unique: true, //no se encuentra definido por defecto en moongose---requiere de npm i mongoose-unique-validator --save
        validate: [validaemail, "Por favor, ingrese un email valido."],
        match: [/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/]
    },
    password:{
        type: String,
        required: [true, "El password es obligatorio."]
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado:{
        type: Boolean,
        default: false
    }
});

//Importar como plugin el unique validator de moongose
usuarioSchema.plugin(uniquevalidator, {message: 'El {PATH} ya existe con otro usuario.'});

usuarioSchema.pre('save',function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reservacion = new reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta});
    console.log(reservacion);
    reservacion.save(cb);
}

module.exports = mongoose.model('usuario',usuarioSchema);
