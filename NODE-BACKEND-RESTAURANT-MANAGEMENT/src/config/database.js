const mongoose= require('mongoose');

const connect= async ()=>{
    try{
        mongoose.set('strictQuery',false);
        const dbConnect=await mongoose.connect(process.env.MONGODATABASE_URI);
        console.log("Successfully Database connected");
    }catch(error){
        console.log("error");
    }

}

module.exports= connect;

