import express from "express"
import mongoose from "mongoose"
import router from "./routers/auth.routers.js";
import router2 from "./routers/employee.routers.js";
import router3 from "./routers/task.routers.js";
import router4 from "./routers/project.routers.js";
import dotenv from "dotenv"
import cors from 'cors'


dotenv.config({
    path:"./.env",
})

const app=express();

const port=3000;
const mongoUrl=process.env.MONGO_URL;
app.use(cors());
app.use(express.json())

app.use("/api/v1/business",router);
app.use("/api/v2/business",router2);
app.use("/api/v3/business",router3);
app.use("/api/v4/business",router4);


mongoose.connect(mongoUrl)
.then(()=>app.listen(port))
.then(()=>console.log("server is connected to the port",port))
.catch((err)=>console.log(err))
