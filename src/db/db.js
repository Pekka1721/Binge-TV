import mongoose, { connect } from "mongoose";
import { DB_NAME } from '../constants.js'

const conncectDB = async ()=>{
   try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`Connected to DB & Host Name : ${connectionInstance.connection.host}`)
   } catch (error) {
    console.log('Mongodb connection error ------>:',error);
    process.exit(1);
   }
}

export default conncectDB;