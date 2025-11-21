import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/user.routes.js"
import connectDB from "./config/db.js"
import PlantRoutes from "./routes/plant.routes.js"

const app = express()



dotenv.config()
app.use(cors())
app.use(express.json())

connectDB()

app.use('/api', userRoutes)
app.use('/api', PlantRoutes)

const PORT = process.env.PORT  || 5000

app.listen(5000)