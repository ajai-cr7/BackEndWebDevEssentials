const express = require('express');
const app = express();
const body_parser = require('body-parser');

//middleware for body-parser
app.use(body_parser.json());

//connecting to database
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test' , 
{useNewUrlParser:true} , 
()=>{console.log('DB SUCCESSFULLY CONNECTED !')}
);



//import routes
const authRoute = require('./routes/auth');

//middleware 
app.use('/api/user',authRoute);

app.listen(3000,()=>{console.log("EXPRESS SERVER STARTED AT PORT 3000")});