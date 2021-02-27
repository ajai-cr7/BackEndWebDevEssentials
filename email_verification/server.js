const express = require('express');
require('dotenv').config();
require('./db/connectDB');
let app = express();

//parse the different request types into json , as body parser is now build into express,.....
app.use(express.json());
app.use(express.urlencoded({extended : true}));


//import routes
const authRoutes = require('./routes/auth');
app.use('/api',authRoutes);


//basic route - for testing purpose
app.get('/',(req,res)=>{console.log('ok'),res.send('ok')});



//port
const port = process.env.PORT;
app.listen(port,console.log(`EXPRESS SERVER STARTED AT PORT ${port}!`));








/*
Notes:
Cross Origin 
Resource Sharing (CORS) in Node.
 CORS essentially means cross-domain
 requests.

*/
