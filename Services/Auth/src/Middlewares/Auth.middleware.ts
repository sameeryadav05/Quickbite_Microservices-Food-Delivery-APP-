import {Request,Response,NextFunction} from 'express'
import ExpressError from '../Utils/ExpressError.js';
import { verifyToken } from '../Utils/jwt.js';
import User, { IUser } from '../Model/User.js';

import redis from '../Config/Redis.js';

export interface AuthRequest extends Request{
    user?:IUser | any
}

export async function AuthMiddleware(req:AuthRequest,res:Response,next:NextFunction)
{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token)
    {
        throw new ExpressError(401,"Session Expired !, please login ");
    }

    const decoded = verifyToken(token,process.env.JWT_SECRET as string);
    if(!decoded)
    {
        throw new ExpressError(401,"Invalid Token !")
    }
    const cachekey =  `auth:user:${decoded.userId}`;

    const cachedUser =  await redis.get(cachekey);

    let user;

    if(cachedUser)
    {
        user = JSON.parse(cachedUser);
        console.log('userfetched from Redis');
    }
    else{
        const userdata = await User.findById(decoded.userId)
        if(!userdata)
        {
            throw new ExpressError(404,"user not found !")
        }

        user = {
            id:userdata._id,
            name:userdata.name,
            email:userdata.email,
            image:userdata.image,
            role:userdata.role
        }

        await redis.set(cachekey,JSON.stringify(user),'EX',60);
    }


    req.user = user;

    next();
}