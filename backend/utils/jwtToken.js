import jwt from "jsonwebtoken"

const jwtToken = (_id) => {
    return jwt.sign({ id: _id }, process.env.JWT_SECRET, { expiresIn: '4d' })
}

export default jwtToken