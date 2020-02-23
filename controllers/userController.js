const Profile = require('../models').profile

exports.show = async (req, res) => {
    try {
        const dataProfile = await Profile.findOne({
            where: { userId: req.params.userId }
        })
        res.send(dataProfile)
    } catch (error) {
        res.send(error)
    }
}
exports.update = async (req, res) => {
    try {
        if (req.user.userId == req.param.userId) {
            const { name, address, phone } = req.body
            await Profile.update({
                name,
                address,
                phone
            }, { where: { userId: req.params.userId } });

            const data = await Profile.findOne({
                where: { userId: req.params.userId }
            })
            res.send({
                message: "Data updated success",
                status: true,
                data
            })
        } else {
            res.send({
                message: "data has not your account",
                status: false
            })
        }
    } catch (error) {
        res.send(error)
    }
}
exports.deleted = async (req, res) => {
    try {
        if (req.user.userId == req.params.userId) {
            Profile.destroy({
                where: { userId: req.params.userId }
            })
            res.send({
                message: "Data detail user deleted",
                status: true,
            })
        } else {
            res.send({
                message: "Data is not your account and not Deleted ",
                status: false
            })
        }
    } catch (error) {
        res.send(error)
    }
}