// const AuthController = require('./authController')
const jwt = require('jsonwebtoken')
const models = require('../models')
const User = models.Users
const Profile = models.Profiles
const Pet = models.Pets
const Species = models.Species

exports.insert = async (req, res) => {
    //req.body for Tabel User, Profile, Pet
    try {
        const {
            email,
            password,
            name_user,
            phone,
            address,
            name_pet,
            gender,
            age,
            photo,
            about,
            species_id
        } = req.body

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
            const pet = await Pet.create({
                name: name_pet,
                gender: gender,
                age: age,
                photo,
                about,
                species_id: species_id,
                user_id: user.id
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

        // const pet = await Pet.create({
        //     name: name_pet,
        //     gender: gender,
        //     age: age,
        //     species_id: species_id,
        //     user_id: user.id
        // })
        // await Species.findOne({
        //     where: { id: pet.species.id }
        // })

        // if (user) {
        //     res.send({
        //         message: "user done",
        //         status: "sucess"
        //     })
        // }
        // await User.findOne({ where: { email, password } }).then(user => {
        //     if (user) {
        //         const tokenKey = jwt.sign({ userId: user.id }, 'my-token-key')
        //         res.send({
        //             email: user.email,
        //             token: tokenKey
        //         })
        //     } else {
        //         res.send({
        //             error: true,
        //             messaga: "wrong email and password"
        //         })
        //     }
        // })
    } catch (error) {
        res.send(error)
    }
}