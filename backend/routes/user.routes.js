// routes/authRoutes.js
import express from 'express'
import { 
    signUp, 
    logIn, 
    googleSignIn, 
    linkGoogleAccount, 
    getUser 
} from '../controllers/user.controller.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', logIn)
router.post('/google', googleSignIn)
router.post('/google/link', linkGoogleAccount)
router.get('/users', getUser)

export default router