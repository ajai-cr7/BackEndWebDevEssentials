const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name : {
		type : String,
		trim : true,
		required : true,
		max : 64
	},
	email : {
		type : String , 
		trim : true,
		required : true,
		unique:true,
		lowercase : true
	},
	password : {
		type : String , 
		required : true,
	}
}, 
{timestamps:true})//timestamps are used to store when the 
//stored data is inserted , like 'time'

module.exports = mongoose.model('sample',userSchema);
