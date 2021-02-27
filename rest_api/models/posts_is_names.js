const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
title :
{
	type:String,required:true
},
description:{
	type:String,required:true
},
date : {
	type:Date , default:Date.now
}
})

//mongoose is for object-data modelling package
module.exports = mongoose.model('postses' ,postSchema);
//this creates an interface with the database and says that postes collection should contain the schema as described by postSchema


/* shortly : 
const mongoose = require('mongoose');
module.exports = mongoose.model('postses' ,
mongoose.Schema({
title :{type:String,required:true},
description:{type:String,required:true},
date : {type:Date , default:Date.now}
})
);
*/
