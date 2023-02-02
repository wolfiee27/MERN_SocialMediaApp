import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";

/* Configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json({limit:'30mb', extented:'true' }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname,'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,'public/assets');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
})

/* MOONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL).then(()=>{
  app.listen(PORT, ()=> console.log(`Server running on PORT : ${PORT}`))
}).catch((err) => console.log(err))