const Species = require('../models').Species

exports.insert = async (req, res) => {
    try {
        const species = await Species.create({
            name: req.body.name,
            information: req.body.information
        })
        res.send({
            id: species.id,
            name: species.name
        })
    } catch (error) {
        res.send(error)
    }
}

exports.show = async (req, res) => {
    try {
        const species = await Species.findAll()
        res.send({
            species
        })
    } catch (error) {
        res.send(error)
    }
}