import conncectDB from "./db/db.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config()

conncectDB()
.then(()=>{
    app.on('error',(error)=>{
        console.log("failed to connect to db",error);
        throw error
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log("App listening on PORT",process.env.PORT|| 8000);
    })
})
.catch((error)=>{
    console.log("error connecting to db:",error);
})
































// import express from 'express';
// import mongoose from 'mongoose';
// // import { DB_NAME } from './constants';
// const DB_NAME = "B-Tv-Cluster"
// const app = express();
// (async ()=>{
// 	try {
// 		await mongoose.connect();
// 		app.on('error',(error)=>{
// 			console.log("Error occured :",error);
// 		})
// 		app.listen(process.env.PORT,()=>{
// 			console.log(`Application is listening on PORT: ${process.env.PORT}`)
// 		})
// 	} catch (error) {
// 		console.log("Error connecting to Database",error);
// 		throw error;
// 	}
// })();











