import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server is running at port:${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!! ", err);
})
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
}