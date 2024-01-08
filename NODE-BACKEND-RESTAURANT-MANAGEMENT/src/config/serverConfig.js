const dotenv=require('dotenv');
dotenv.config();

module.exports={
    PORT: process.env.PORT,
    AUTHKEY: process.env.AUTHKEY,
    REDIS_URL: process.env.REDIS_URL
}

