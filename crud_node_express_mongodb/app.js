const express = require('express');
const app = express();
const body_parser = require('body-parser');
const express_hb = require('express-handlebars');
const path = require('path'); 
const chalkAnimation = require('chalk-animation');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Handlebars = require('handlebars')


const CourseController = 
require('./controllers/courses');


//middleware for body parser
app.use(body_parser.urlencoded({
	extended : true
}));
app.use(body_parser.json());

//database connectivity : 
const dbconnection = require('./mongoose_connect'); 

//creating some views stuffs
app.set('views' , path.join(__dirname , 
"/views/"));//__dirname is global variable
app.engine("hbs",express_hb({
	extname : "hbs" ,
	defaultLayout : "mainlayout",
	layoutsDir : __dirname + "/views/layouts",
	   handlebars: allowInsecurePrototypeAccess(Handlebars)

}));
app.set("view engine" , "hbs");



//routes
app.get('/',(req,res)=>{
  //res.send('hello world!');
  res.render("index",{});
});
app.use("/course",CourseController);







//app listens at port 8000
app.listen(8000,()=>{
const rainbow = chalkAnimation.rainbow('Express server started at port 8000',5); // Animation starts
setTimeout(() => {
    rainbow.stop(); // Animation stops
}, 100);
});