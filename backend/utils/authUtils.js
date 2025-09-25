// utils/authUtils.js
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const generateToken = (userId) => {
    return jwt.sign(
        { userId }, 
        process.env.JWT_SECRET, 
        { expiresIn: '30d' }
    )
}

export const hashPassword = async (password) => {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
}

export const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}