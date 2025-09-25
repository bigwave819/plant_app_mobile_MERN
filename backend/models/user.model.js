// models/User.js
import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // Make password optional for Google OAuth users
        required: function() {
            return !this.googleId; // Only required if not using Google OAuth
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows multiple null values
    },
    avatar: {
        type: String // Store Google profile picture
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User