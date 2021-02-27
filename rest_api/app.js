const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config')


//middleware for body-parser
app.use(bodyParser.json());

//import routes 
const postsRoute = require('./routes/routes_request_posts');
app.use('/Request', postsRoute);//middleware

//routes demonstration : 
app.get('/' , (req, res)=>{
res.send('we are on home');
});



mongoose.connect(process.env.DB_CONNECTION , {useNewUrlParser: true},
()=>{
	console.log("DATABASE CONNECTED !");
});
//this app creates a server and starts listening to port 3000
app.listen(3001);