const nodemailer = require('nodemailer');

const mailcongif={
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth:{
        user:'norene.shanahan89@ethereal.email',
        pass:'JRurCJpPFykdJH8ft8',
    }
}

module.exports = nodemailer.createTransport(mailcongif);