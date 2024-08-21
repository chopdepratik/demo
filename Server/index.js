import express from "express";
import mongoose from "mongoose";
import router from "./routers/auth.routers.js";
import router2 from "./routers/employee.routers.js";
import router3 from "./routers/task.routers.js";
import router4 from "./routers/project.routers.js";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config({
    path: "./.env",
});

const app = express();

// Use the PORT environment variable provided by Render or default to 3000 for local development
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

app.use(cors({
  origin: 'https://bmanagement.netlify.app/' // Replace with your Netlify URL
}));
app.use(express.json());

app.use("/api/v1/business", router);
app.use("/api/v2/business", router2);
app.use("/api/v3/business", router3);
app.use("/api/v4/business", router4);

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });
