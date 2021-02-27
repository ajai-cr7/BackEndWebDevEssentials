const mongoose = require('mongoose');

//db connectivity
mongoose.connect(process.env.DATABASE,{
useNewUrlParser : true , 
useFindAndModify : true , 
useUnifiedTopology : true ,
useCreateIndex : true
}).then(()=>{
	console.log('Database connection established');
}).catch(()=>{console.log('DB not connected!!')}
);
