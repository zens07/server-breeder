const Species = require('../models').species
const Users = require('../models').users

exports.index = async (req, res) => {
    try {
        const species = await Species.findAll()
        res.send({
            species
        })
    } catch (error) {
        res.send(error)
    }
}

exports.insert = async (req, res) => {
    try {
        if (req.user.userId) {
            const userFind = await Users.findOne({
                where: { id: req.user.userId }
            })
            // console.log(userFind)
            if (userFind.role == "admin") {
                const species = await Species.create({
                    name: req.body.name,
                    information: req.body.information
                })
                res.send({
                    id: species.id,
                    name: species.name,
                    message: "created new species done",
                    status: "true"
                })
            } else if (userFind.role == "user") {
                res.send({
                    message: "You are not an admin role",
                    status: "false"
                })
            }
        }
    } catch (error) {
        res.send(error)
    }
}
