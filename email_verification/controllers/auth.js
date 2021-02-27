const user = require('../models/user');
const jwt = require('jsonwebtoken');

const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN_NAME;
const mg = mailgun({apiKey: process.env.API_KEY, domain: DOMAIN});
										//for mailgun 

exports.signup = (req,res)=>{
	console.log(req.body);
	let UserExists = user.findOne({email : req.body.email});
	if(!UserExists){
		return res.json({message : "email exists"});
	}
	const {name,email,password} = req.body;
	//give jwt to res header
	const token = jwt.sign({name,email,password} , 
					  process.env.JWT_ACTIVATE,{expiresIn:'20m'});
				//	  res.send(token); //in POSTMAN
 //console.log(token);
	const data = {
	from: 'noreply@hello.com',
	to: req.body.email,
	subject: 'Email account activation',
	html : `
		<h2> please click on the below link to activate </h2>
		<a> ${process.env.CLIENT_URL}/auth/${token} </a> `
		
};
mg.messages().send(data, function (error, body) {
	console.log(body);
	if(error)
	{
		res.json({err: error});
	}
	res.json({'message' : 'EMAIL HAS BEEN SENT TO ACTIVATE YOUR ACCOUNT'});
});	}

exports.activateAccount = async(req,res)=>{
	const {token} = req.body;
	if(token)
	{
		jwt.verify(token,process.env.JWT_ACTIVATE,async(err,decoded)=>{
			
			if(err){return res.json({'message' : 'expired'});} 
			console.log(decoded);
			const {name,email,password,iat,exp}=decoded;	
			//use it after activation
	const newUser = new user({
		name : name , 
		email : email , 
		password : password
	});
	await newUser.save((err,ok)=>{
		if(err)res.send('error occurs');
		else res.send('sign up success');
	});
		}); 
	}
	else{
		return res.json({'ERROR'  : "error in token"});
	}
};


