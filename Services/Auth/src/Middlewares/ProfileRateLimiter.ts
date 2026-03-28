import redis from "../Config/Redis.js";

import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./Auth.middleware.js";

export async function ProfileRatelimiter(req:AuthRequest,res:Response,next:NextFunction)
{
    try {
                const keyprefix=`auth`
                const  maxRequest=5
                const windowInSecond=15

            const ip = req.ip;

            const key = `${keyprefix}:${req.user?.id || req.ip}`;

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
                    message:`Stop Refreshing the page !`
                })
            }

            next();
            
        } catch (error) {
            next(error);
        }
}