const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');


//middleware for body-parser
app.use(bodyParser.json());
app.get('/',(req,res)=>{console.send('ok')});



//goal of this endpoint is to login and  create a secret key , which is a string , you can also 
//convert that to a QR code

app.get('/totp-secret',async(req,res,next)=>{
	 var secret = speakeasy.generateSecret({length:20});
// Returns an object with secret.ascii, secret.hex, and secret.base32.
// Also returns secret.otpauth_url which can be used to create qrcode
	console.log(secret);
//next get-qr code 

	qrcode.toDataURL(secret.otpauth_url,(err,data)=>{
	console.log(data);
//actually it must be redirected /verify route .... but here we use api testing tool - postman
	res.send({"secret key : " : secret.base32}); //here we used POSTMAN , so we've seen the result in postman console
});
}); 

//next scan the qrcode and generate a 6 digit code in google authenticator
/*
How to generate a time based one time OTP and also validate it to check it with the secret key
In most cases , i'll get the QR code(thats my secret) and scan 
it and send it to google authenticator and  google authenticator will generate 
a 6-digit code every 30 seconds and i pass that back to server
and validation is done and authenticated = whole logic behind 2fa 
*/


//validating the token 

app.post('/verify',(req,res)=>{

	 var verfiys =	speakeasy.totp.verify({
		 //actually secret must be somewhere stored in database as soon as the user - login
		 //here we just provide it for learning purpose
			secret: 'IBUSGN2IJNGUKPRDOJJFCXTQM5DWYIK6' ,
			encoding : 'base32' ,
			token : req.body.token //user enters the six digit code shown in their google authenticator app
		});
		console.log(verfiys);
		res.send({'verified id : ' : verfiys});
});




app.listen(3000,console.log('EXPRESS SERVER STARTED AT PORT 3000!'));
