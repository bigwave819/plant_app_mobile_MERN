import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import jwtToken from '../utils/jwtToken.js'
import { verifyGoogleToken } from '../utils/googleOAth.js'

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            // Check if user exists with Google auth
            if (existingUser.googleId) {
                return res.status(400).json({ 
                    message: "Email already registered with Google. Please sign in with Google or use a different email." 
                })
            }
            return res.status(400).json({ message: "Email is in use" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isVerified: false // Email verification can be added later
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

        // Check if user registered with Google
        if (user.googleId && !user.password) {
            return res.status(400).json({ 
                message: "This account uses Google Sign-In. Please sign in with Google." 
            })
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

// New Google Sign-In Controller
export const googleSignIn = async (req, res) => {
    try {
        const { token } = req.body

        if (!token) {
            return res.status(400).json({ message: "Google token is required" })
        }

        // Verify Google token
        const verification = await verifyGoogleToken(token)
        
        if (!verification.success) {
            return res.status(401).json({ message: "Invalid Google token" })
        }

        const { googleId, email, name, avatar, emailVerified } = verification.payload

        if (!emailVerified) {
            return res.status(400).json({ message: "Google email not verified" })
        }

        // Check if user already exists with Google ID
        let user = await User.findOne({ googleId })

        if (user) {
            // User exists with Google OAuth - generate token and login
            const token = jwtToken(user._id)
            
            return res.status(200).json({
                message: "Google sign-in successful",
                user: {
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                },
                token
            })
        }

        // Check if user exists with same email (password user wanting to add Google)
        user = await User.findOne({ email })

        if (user) {
            // User exists with email/password - link Google account
            user.googleId = googleId
            user.avatar = avatar || user.avatar
            user.isVerified = true
            await user.save()

            const token = jwtToken(user._id)
            
            return res.status(200).json({
                message: "Google account linked successfully",
                user: {
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                },
                token
            })
        }

        // Create new user with Google OAuth
        const newUser = await User.create({
            name,
            email,
            googleId,
            avatar,
            isVerified: true
        })

        const newToken = jwtToken(newUser._id)

        res.status(201).json({
            message: "Account created with Google",
            user: {
                name: newUser.name,
                email: newUser.email,
                avatar: newUser.avatar
            },
            token: newToken
        })

    } catch (error) {
        console.error('Google sign-in error:', error)
        
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({
                message: "User already exists with this email"
            })
        }

        res.status(500).json({
            message: `Server error: ${error.message}`
        })
    }
}

// Optional: Link Google to existing account (requires auth middleware)
export const linkGoogleAccount = async (req, res) => {
    try {
        const { token } = req.body
        const userId = req.user.id // From auth middleware

        if (!token) {
            return res.status(400).json({ message: "Google token is required" })
        }

        const verification = await verifyGoogleToken(token)
        
        if (!verification.success) {
            return res.status(401).json({ message: "Invalid Google token" })
        }

        const { googleId, email } = verification.payload

        // Check if Google account is already linked
        const existingGoogleUser = await User.findOne({ googleId })
        if (existingGoogleUser) {
            return res.status(400).json({
                message: "Google account already linked to another user"
            })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // Verify email matches
        if (user.email !== email) {
            return res.status(400).json({
                message: "Google account email doesn't match your account email"
            })
        }

        // Link Google account
        user.googleId = googleId
        user.avatar = verification.payload.avatar || user.avatar
        user.isVerified = true
        await user.save()

        res.json({
            message: "Google account linked successfully",
            user: {
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        })

    } catch (error) {
        console.error('Link Google account error:', error)
        res.status(500).json({
            message: `Server error: ${error.message}`
        })
    }
}

export const getUser = async (_, res) => {
    try {
        const users = await User.find().select('-password') // Exclude passwords

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' })
        }

        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error.message}`
        })
    }
}