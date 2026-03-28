import {Redis} from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

interface redisCredential{
    host:string,
    port:number,
    password:string
} 

const redisConfig:redisCredential = {
    host:process.env.REDIS_HOST as string,
    port:Number(process.env.REDIS_PORT),
    password:process.env.REDIS_PASSWORD as string
}

const redis = new Redis(redisConfig);

redis.on('connect',()=>{
    console.log('Redis connected !');
})

redis.on("error", (err:any) => {
  console.log("Redis Error:", err);
});

export default redis;