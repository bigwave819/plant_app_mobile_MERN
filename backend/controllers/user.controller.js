import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import jwtToken from '../utils/jwtToken.js'

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
                return res.status(400).json({ 
                    message: "Email in use" 
                })
            return res.status(400).json({ message: "Email is in use" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        const token = jwtToken(user._id)

        return res.status(201).json({
            message: "Account created successfully",
            user: {
                name: user.name,
                email: user.email
            },
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error.message}`
        })
    }
}

export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const matchPassword = await bcrypt.compare(password, user.password)

        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid email or password" })
        }
        
        const token = jwtToken(user._id)
        
        return res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                avatar: user.avatar
            },
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error.message}`
        })
    }
}

