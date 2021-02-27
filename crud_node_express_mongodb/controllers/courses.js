const express = require('express');
require('@handlebars/allow-prototype-access');
const mongoose = require('mongoose');
const router = express.Router();
//import the schema 
const CourseModel = require('../schema_forDb');


router.get("/add",(req,res)=>{
	res.render("add_course",{});
});

router.post("/add",async(req,res)=>{
	console.log(req.body) ;
	const instance = new CourseModel(
	{
		cName : req.body.cName,
		cId : req.body.cId,
		cDuration : req.body.cDuration,
		cFee : req.body.cFee
	}
	);
	const savedPost = await instance.save();
	res.redirect('/course/list');
});

router.get("/list",async (req,res)=>{
	try{
	const result = await CourseModel.find();
	//console.log(result);

	//res.json(result);
	res.render("list",{data : result});
	}
	catch(err)
	{
		res.send(err);
	}
}); 
module.exports = router;
