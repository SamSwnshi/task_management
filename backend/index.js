import express from "express"
import dotenv from "dotenv"
import config from "./db/config.js"
dotenv.config()

const port = process.env.PORT || 8080;
const app = express()


app.listen(port,()=>{
    config()
    console.log(`Server is Running in PORT: ${port}`)
})