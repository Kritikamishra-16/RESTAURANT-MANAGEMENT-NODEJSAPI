const Redis= require('ioredis');
const {REDIS_URL} = require('./serverConfig'); 


const getRedisUrl=()=>{
    console.log(REDIS_URL);
    if(REDIS_URL){
        return REDIS_URL
    }
    throw new Error('REDIS_URL is not defined');
}

const redis= new Redis(getRedisUrl());
module.exports= redis; 