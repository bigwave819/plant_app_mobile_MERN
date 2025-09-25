import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/user.routes.js"
import connectDB from "./config/db.js"

const app = express()



dotenv.config()
app.use(cors())
app.use(express.json())

connectDB()

//root
app.use('/api', userRoutes)

const PORT = process.env.PORT  || 5000

app.listen(5000)