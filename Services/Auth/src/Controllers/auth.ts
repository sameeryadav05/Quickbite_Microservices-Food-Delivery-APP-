import { Request ,Response} from "express"
import User from "../Model/User.js";
import { generateToken } from '../Utils/jwt.js'
import WrapAsync from "../Utils/WrapAsync.js";
import { AuthRequest } from "../Middlewares/Auth.middleware.js";
import ExpressError from "../Utils/ExpressError.js";
import { OAuth2Client } from "../Config/googleConfig.js";
import axios from 'axios'

export const loginUser = WrapAsync(async (req,res)=>{
    const {code} = req.body;
    if(!code)
    {
        throw new ExpressError(400,"Authorization Code is Required !")
    }
    const googleRes = await OAuth2Client.getToken(code);
    OAuth2Client.setCredentials(googleRes.tokens)

    if(!googleRes.tokens.access_token)
    {
        throw new ExpressError(401,"Google Authentication failed !")
    }

    const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)


    const {name,email,picture} = userRes.data

    let user = await User.findOne({email});

    if(!user)
    {
        user = await User.create({
            name,email,image:picture
        })
    }
 
    const token = generateToken({ userId: user._id.toString() },process.env.JWT_SECRET as string)

    res.status(201).json({success:true,message:`Welcome ${name}`,token,user})
})   

export const addUserRole = WrapAsync(async (req:AuthRequest,res)=>{
    const allowedRoles = ["customer","rider","seller"] as const;
    type Role = (typeof allowedRoles)[number];

        if(!req.user?.id)
        {
            throw new ExpressError(401,"UnAuthorized")
        }
        const {role} = req.body as {role:Role}

        if(!allowedRoles.includes(role))
        {
            throw new ExpressError(400,"Invalid Role !")
        }

        const user = await User.findByIdAndUpdate(req.user.id,{role},{returnDocument:'after'})

        res.json({
            success: true,
            message: "Role updated successfully",
            user
        });
})

export const profile = (req:AuthRequest,res:Response)=>{
    const user = req.user
    res.json({success:true,user})
}