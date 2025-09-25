// config/googleOAuth.js
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})

export const verifyGoogleToken = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
        
        const payload = ticket.getPayload()
        return {
            success: true,
            payload: {
                googleId: payload.sub,
                email: payload.email,
                name: payload.name,
                avatar: payload.picture,
                emailVerified: payload.email_verified
            }
        }
    } catch (error) {
        return {
            success: false,
            error: 'Invalid Google token'
        }
    }
}

export default client