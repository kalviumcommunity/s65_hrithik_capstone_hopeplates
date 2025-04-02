const NGO = require("../models/NGO")

exports.createNGO = async (req, res) => {
    try {
        const { name, email, location, contactNumber } = req.body

        const ngo = new NGO({
            name,
            email,
            location,
            contactNumber,
        });

        await ngo.save()
        res.status(201).json({ message: "NGO created successfully", ngo })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

exports.getAllNGOs = async (req, res) => {
    try {
        const ngos = await NGO.find()
        res.status(200).json(ngos)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getNGOById = async (req, res) => {
    try {
        const ngo = await NGO.findById(req.params.id)
        if (!ngo) return res.status(404).json({ message: "NGO not found" })

        res.status(200).json(ngo)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.updateNGO = async (req, res) => {
    try {
        const { name, email, location, contactNumber } = req.body

        const ngo = await NGO.findByIdAndUpdate(
            req.params.id,
            { name, email, location, contactNumber },
            { new: true }
        )

        if (!ngo) return res.status(404).json({ message: "NGO not found" })

        res.status(200).json({ message: "NGO updated successfully", ngo })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
exports.deleteNGO = async (req, res) => {
    try {
        const ngo = await NGO.findByIdAndDelete(req.params.id);
        if (!ngo) return res.status(404).json({ message: "NGO not found" })

        res.status(200).json({ message: "NGO deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}