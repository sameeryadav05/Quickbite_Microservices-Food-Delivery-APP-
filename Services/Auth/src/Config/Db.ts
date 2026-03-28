import mongoose from 'mongoose';


const ConnectDatabase = async (url:string,dbName:string):Promise<void>=>{
    try {
        await mongoose.connect(url,{dbName});
        console.log("Database Connected !");
    } catch (error) {
        console.log("MongoDb Connection Failed !",error);
        process.exit(1)
    }
}


export default ConnectDatabase;