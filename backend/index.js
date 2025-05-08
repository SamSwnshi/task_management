import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import config from "./db/config.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js"
dotenv.config()

const port = process.env.PORT || 8080;
const app = express()

app.use(cors({
    origin: "*", 
    credentials: true
}));
app.use(express.json())

app.use("/api",userRoutes)
app.use("/api/task",taskRoutes)


app.listen(port,()=>{
    config()
    console.log(`Server is Running in PORT: ${port}`)
})