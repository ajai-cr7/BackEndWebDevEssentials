const mongoose = require('mongoose');

//define a schema for the collection name "course_"
const Schemas = new mongoose.Schema({
	cName : { type : String },
	cId : {type : String},
	cDuration : {type : String},
	cFee : {type : String}
});

//export that collection 
module.exports = mongoose.model('course_',Schemas);