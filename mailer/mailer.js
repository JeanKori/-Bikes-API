const nodemailer = require('nodemailer');

const mailcongif={
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth:{
        user:'Aqui va su email de ethereal',
        pass:'Aqui su contraseña',
    }
}

module.exports = nodemailer.createTransport(mailcongif);