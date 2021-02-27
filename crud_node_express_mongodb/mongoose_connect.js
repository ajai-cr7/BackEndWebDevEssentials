const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_api',
{useNewUrlParser : true},
function(err){
	if(err)console.log('Database not connected ! there is a error ');
	else console.log('Database connected');
});

require('./schema_forDb');