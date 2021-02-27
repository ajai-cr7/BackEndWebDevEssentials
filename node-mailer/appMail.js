var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ajaibalu.2001@gmail.com',
    pass: '9952803416'
  }
});

var maopt = {
  from: 'ajaibalu.2001@gmail.com',
  to: 'ajaijaya.2001@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(maopt, (error, info)=>{
  if (error) {
    console.log('error');
  } else {
    console.log('Email sent: success ');
  }
});