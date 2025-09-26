import Plant from "../models/plant.model.js"

export const getAllPlant = async (req, res) => {
    try {
        const plant = await Plant.find()

        if (plant.length == 0) {
            return res.status(404).json({ message: "Empty Plant" })
        }

        return res.status(200).json(plant)
    } catch (error) {
        return res.status(500).json({
            message: "server error" + error
        })
    }
}