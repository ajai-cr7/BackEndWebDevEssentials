let express = require("express")
let passport = require("passport")
let bodyParser = require("body-parser") 
let jwt = require("jwt-simple")
let auth = require("./auth.js")()
let users = require('./schema.js');
let cfg = require("./config.js")
let app = express()
let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');




app.use(bodyParser.json())
app.use(auth.initialize())


mongoose.connect(cfg.DBCONNECTION,{
useNewUrlParser : true , 
useFindAndModify : true , 
useUnifiedTopology : true ,
useCreateIndex : true
}).then(()=>{
	console.log('Database connection established - enjoy');
}).catch(()=>{console.log('DB not connected!!')}
);


app.get("/", (req, res) => {  
    res.json({
        status: "good route connection"
    });
});

app.get("/user", auth.authenticate(), (req, res) => { 
	res.json({message : "Authorized !"});
});

//debugging (for testing)
app.get("/userDebug", (req, res, next) => {
    console.log(req.get('Authorization'))
    next()
}, function(req, res){
    res.json("Debugging. See token in console.   " + req.get('Authorization'))
});

app.post('/register',async(req,res)=>{
	const emailExist = await users.findOne({email : req.body.email});
	if(emailExist)
	{return res.status(400).send('Email already exists');}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await 
	bcrypt.hash(req.body.password,salt);
	 
	const user = new users({
			name : req.body.name,
			email : req.body.email,
			password : hashedPassword
		});
		try{
			const savedPost = await user.save();
			res.send(savedPost);
		}catch(err)
		{
			res.status(400).send(err);
		}
});


app.post("/login", async(req, res) => {  
if (req.body.email && req.body.password) {
    let email = req.body.email;
    let password = req.body.password;
	
	//let user = search in db
	
		let user = await users.findOne({email : req.body.email});
	if(!user)
	{return res.status(400).send('Email doesnt exists');}
	
	const validPass = await bcrypt.compare(req.body.password , user.password);
	if(!validPass)
	{
		return res.send("invalid password");
	}
    if (user) {
        let payload = {
            id: user.id,
            expiresIn: cfg.expiresIn
        };
		console.log(payload);
        let token = jwt.encode(payload, cfg.jwtSecret);
        res.json({
            Authorization: "JWT " + token
        });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
}
});


const port = cfg.port;
app.listen(port, function() {  
     console.log(`EXPRESS SERVER STARTED ON PORT ${port}`);
 });

module.exports = app;  
