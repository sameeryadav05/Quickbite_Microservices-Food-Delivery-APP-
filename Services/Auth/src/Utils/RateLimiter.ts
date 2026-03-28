import redis from "../Config/Redis.js";

import { Request, Response, NextFunction } from "express";

export function createRatelimiter(keyprefix:string,maxRequest:number,windowInSecond:number)
{
    return async function(req:Request,res:Response,next:NextFunction)
    {
        try {

            const ip = req.ip;

            const key = `${keyprefix}:${ip}`;

            const requestCount = await redis.incr(key);
            if(requestCount === 1)
            {
                await redis.expire(key,windowInSecond);
            }
            if(requestCount>maxRequest)
            {
                const ttl = await redis.ttl(key);

                return res.status(429).json({
                    success:false,
                    message:`Too Many Requesy , please try again after ${ttl} seconds`
                })
            }

            next();
            
        } catch (error) {
            next(error);
        }
    }
}