var reserva = require('./reserva');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uniquevalidator = require('mongoose-unique-validator');

const bcrypt = require('bcryptjs'); //npm install bcryptjs --save
const saltRounds= bcrypt.genSaltSync(10);

const crypto= require('crypto');
const { defaultMaxListeners } = require('stream');

const Token = require('../models/token');
const mailer = require('../mailer/mailer');

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
    role: {
        type: String,
        default: 'ordinary',
        enum: [
            'ordinary',
            'admin',
            'Super_admin'
        ]
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

//verificacion de ambiente para el envio de mensaje
let head_url;

if(process.env.NODE_ENV === 'production'){
    head_url = process.env.WEB_URL;
}else{
    if(process.env.NODE_ENV === 'staging'){
        head_url = process.env.WEB_URL;
    }else{
        head_url = process.env.WEB_URL;
    }
}

// Funcion para el envio de msj a partir del nodemailer
usuarioSchema.methods.enviar_email_bienvenida = function(cb){
    const token = new Token({_userId: this.id, token: crypto.randomBytes(32).toString('hex')});
    const name = this.nombres;
    const email_destination = this.email;
    token.save(function(err){
        if(err) {return console.log(err.message);}
        const mailOptions= {
            from: 'rzambra59@gmail.com', 
            to: email_destination,
            subject: "Verificacion de Cuenta ✔",
            html: '<p>Hola '+name+'.\n\n'+ 'Bienvenido a la red de Bicicletas urbanas mas grande del país, para verificar su cuenta \
                   haga click en el siguiente link:</p> \n\n' + `<a href="${head_url}/token/confirmation/${token.token}" target="_blank">
                   ${head_url}/token/confirmation/${token.token}</a>`
        };

        mailer.sendMail(mailOptions, function(err){
            if(err) {return console.log(err.message);}
            console.log('Se ha enviado un email de confirmacion de cuenta a '+email_destination+'.');
        });

    });
}

// Funcion de envio de msj para restablecimiento de password
usuarioSchema.methods.resetpassword = function(cb){
    const token = new Token({_userId: this.id, token: crypto.randomBytes(32).toString('hex')});
    const email_destination = this.email;
    const name = this.nombres;
    token.save(function(err){
        if(err) {return cb(err);}
        const mailOptions= {
            from: 'rzambra59@gmail.com', 
            to: email_destination,
            subject: "Restablecer contraseña.",
            html: `<p>Hola ${name}.</p></br>`+'<p>Para proceder al restablecimiento de la contraseña de su cuenta\
                   haga click en el siguiente link:</p>' + `<a href="${head_url}/login/resetpassword/${token.token}" target="_blank"> ${head_url}/login/resetpassword/${token.token} </a>`
        };

        mailer.sendMail(mailOptions, function(err){
            if(err) {return cb(err);}

            console.log('Se ha enviado un email para restablecer la contraseña de su cuenta a'+email_destination+'.');
        });
        cb(null);
    });
}

// Creacion de usuario con autenticacion de google
usuarioSchema.statics.findOneOrCreateByGoogle = function findOneOrCreate(condition, callback) {
    const self = this;
    console.log(condition);
    self.findOne({
       $or: [
          {'googleId': condition.id}, {'email': condition.emails[0].value}
    ]}, (err, result) => {
          if (result) {
             callback(err, result)
          } else {
             console.log('=========== CONDITION ===========');
             console.log(condition);
             let values = {};
             values.googleId = condition.id;
             values.email = condition.emails[0].value;
             values.nombres = condition.displayName || 'SIN NOMBRES';
             values.apellidos = condition.family_name || 'SIN APELLIDOS';
             values.verificado = true;
             values.password = condition._json.etag;
             console.log('========== VALUES ============');
             console.log(values);
             self.create(values, (err, result) => {
                if (err) {console.log(err);}
                return callback(err, result)
             })
          }
    
    })
 };

module.exports = mongoose.model('usuario',usuarioSchema);
