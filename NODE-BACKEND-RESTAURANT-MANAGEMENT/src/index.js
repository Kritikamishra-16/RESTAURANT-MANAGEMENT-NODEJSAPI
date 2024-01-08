const express=require('express');
const bodyParser= require('body-parser');
const ApiRoutes=require('./routes/index');
const db= require('./config/database');
const {PORT} = require('./config/serverConfig'); 

const setupAndStartServer= async()=>{
    //create the express object
    const app= express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //this app.use middleware is applied to all of the incoming requests
    app.use('/api',ApiRoutes);

    app.listen(PORT,async ()=>{
        console.log(`Server started at ${PORT}`); 
        await db();
    });

}

setupAndStartServer();