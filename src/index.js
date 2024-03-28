import conncectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config()

conncectDB();
































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











