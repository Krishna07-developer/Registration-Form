import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();
const connectDb = async (req,res)=>{
    try {
        const connect = await mongoose.connect(process.env.CONNECT_SERVER)
        console.log("Database connected ");
    } catch (err) {
        console.log(err); 
        process.exit(1)
    }
}

export default connectDb;