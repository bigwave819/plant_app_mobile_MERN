// routes/authRoutes.js
import express from 'express'
import { 
    getAllPlant 
} from '../controllers/plant.controller.js'

const router = express.Router()

router.get('/plants', getAllPlant)

export default router