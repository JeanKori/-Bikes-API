const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport'); //npm install nodemailer-sendgrid-transport --save

let mailcongif;

if(process.env.NODE_ENV === 'production'){
    const options ={
        auth:{
            api_key: process.env.SENDGRID_API_SECRET
        }
    }
    mailcongif = sgTransport(options);
}else{
    if(process.env.NODE_ENV === 'staging'){
        const options ={
            auth:{
                api_key: process.env.SENDGRID_API_SECRET
            }
        }
        mailcongif = sgTransport(options);
    }else{
        mailcongif={
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth:{
                user: process.env.ethereal_user,
                pass: process.env.ethereal_pwd,
            }
        };        
    }
}

module.exports = nodemailer.createTransport(mailcongif);