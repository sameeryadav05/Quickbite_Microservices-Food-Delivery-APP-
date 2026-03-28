import mongoose,{Document, Schema} from 'mongoose';


export interface IUser extends Document{
    name:string,
    email:string,
    image:string,
    role:string,
};


const userSchema:Schema<IUser> = new Schema({
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            unique:true,
            trim:true
        },
        image:{
            type:String,
            trim:true
        },
        role:{
            type:String,
            default:null,
            enum: ["customer","rider","seller"]
        }
    },{timestamps:true})


const User = mongoose.model<IUser>('Users',userSchema)

export default User;

