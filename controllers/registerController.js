// const AuthController = require('./authController')
const jwt = require('jsonwebtoken')
const models = require('../models')
const User = models.users
const Profile = models.profile
const Pet = models.pet
const Species = models.species

exports.insert = async (req, res) => {
    //req.body for Tabel User, Profile, Pet
    try {
        const {
            email,
            password,
            name_user,
            phone,
            address,
        } = req.body
        const {
            name_pet,
            gender,
            age,
            photo,
            about,
            species_id
        } = req.body.pet

        validationUser = await User.findOne({ where: { email } })
        if (!validationUser) {
            const user = await User.create({
                email: email,
                password: password,
                role: "user",
            })
            const profile = await Profile.create({
                name: name_user,
                phone: phone,
                address: address,
                user_id: user.id
            })
            // console.log(profile)
            const pet = await Pet.create({
                name: name_pet,
                gender: gender,
                age: age,
                photo,
                about,
                speciesId: species_id,
                userId: user.id
            })
            const species = await Species.findOne({
                where: { id: pet.species_id }
            })
            if (user && profile && pet && species) {
                const userFind = await User.findOne({ where: { email, password } })
                const tokenKey = await jwt.sign({ userId: userFind.id }, 'my-token-key')
                res.send({
                    message: "succesfully for inputed data",
                    status: "success",
                    email: userFind.email,
                    token: tokenKey
                })
            }
        } else {
            res.send({
                message: "email telah terdaftar",
                status: "failed"
            })
        }
    } catch (error) {
        res.send(error)
    }
}