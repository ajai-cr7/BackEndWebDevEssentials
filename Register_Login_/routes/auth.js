const router = require('express').Router();
const body_parser = require('body-parser');
const User =  require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {registerValidation , loginValidation} = require('../validation');
router.post('/register',async(req,res)=>{
	
	//this also works correctly ..when there is a invalid entry it throws the error object ..which shows the details of the error ....
	//const validation = Joi.validate(req.body , schema);
	//res.send(validation);
	
	//when we define the joi schema here, use this...
	//const {error} = Joi.validate(req.body,schema);
	//res.send(error.details[0].message);
	//	if(error)return res.status(400).send(error.details[0].message);
	
	//in a separate file(this code checks validation)
	const {error} = registerValidation(req.body);
	if(error)return res.status(400).send(error.details[0].message);
	
	//checking if the user is already in the database
	const emailExist = await User.findOne({email : req.body.email});
	if(emailExist)
	{return res.status(400).send('Email already exists');}

	//hash the passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await 
	bcrypt.hash(req.body.password,salt);
	
	//now insert the record into the database 
	const user = new User({
			name : req.body.name,
			email : req.body.email,
			password : hashedPassword,
			date : req.body.date
		});
		try{
			const savedPost = await user.save();
			//res.json(savedPost);
			res.send({id : user._id});
		}catch(err)
		{
			res.status(400).send(err);
		}
});

//login :
router.post('/login',async(req,res)=>{
	const {error} = loginValidation(req.body);
	if(error)return res.status(400).send(error.details[0].message);
	
	//if email already exists
	const user = await User.findOne({email : req.body.email});
	if(!user)
	{return res.status(400).send('Email doesnt exists');}
	
	const validPass = await bcrypt.compare(req.body.password , user.password);
	if(!validPass)
	{
		return res.send("invalid password");
	}
	
	//res.send('login successful');
	const token = jwt.sign({_id : user._id},"jasdflfjlfafwoomm");
	res.header('auth-token',token).send(token);
});

module.exports = router;
