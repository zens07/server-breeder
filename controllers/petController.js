const Pet = require("../models").pet;
const User = require("../models").users;
const Species = require("../models").species;

exports.index = async (req, res) => {
    try {
        const data = await Pet.findAll({
            include: [
                {
                    model: Species
                },
                {
                    model: User
                }
            ]
        });
        res.send({
            message: "All your Data",
            data
        });
    } catch (error) {
        res.send(error);
    }
};

exports.show = async (req, res) => {
    const data = await Pet.findOne({
        include: [
            {
                model: Species
            },
            {
                model: User
            }
        ]
    }, { where: { id: req.params.id } })
    res.send({
        data
    })
}
exports.insert = async (req, res) => {
    try {
        if (req.user.userId) {
            const { name_pet, gender, species_id, age, about_pet, photo } = req.body;
            const dataPet = await Pet.create({
                name: name_pet,
                gender,
                age,
                photo,
                about: about_pet,
                speciesId: species_id,
                userId: req.user.userId
            });
            const data = await Pet.findOne({
                include: [
                    {
                        model: User
                    },
                    {
                        model: Species
                    }
                ]
            }, {
                where: { id: dataPet.id }
            });
            res.send({
                data,
                message: "created another Pet done",
                status: "true"
            });
        }
    } catch (error) {
        res.send(error);
    }
};

exports.edit = async (req, res) => {
    try {
        const { name_pet, gender, species_id, age, about_pet, photo } = req.body;
        const validationPet = await Pet.findOne({
            where: { id: req.params.id, userId: req.user.userId }
        });
        if (validationPet) {
            const pet = await Pet.update(
                {
                    name: name_pet,
                    gender,
                    age,
                    photo,
                    about: about_pet,
                    speciesId: species_id,
                    userId: req.user.userId
                },
                { where: { id: req.params.id, userId: req.user.userId } }
            );
            const dataPet = await Pet.findOne({
                include: [
                    {
                        model: Species
                    },
                    {
                        model: User
                    }
                ]
            }, { where: { id: pet.id } })
            res.send({
                message: "Data is updating success",
                status: true,
                dataPet
            });
        } else {
            res.send({
                message: "No Data Pet in your account",
                status: false,
            });
        }
    } catch (error) {
        res.send(error);
    }
};

exports.deleted = async (req, res) => {
    try {
        const validationPet = await Pet.findOne({
            where: { id: req.params.id, userId: req.user.userId }
        });
        if (validationPet) {
            await Pet.destroy({
                where: { id: req.params.id }
            });
            res.send({
                message: "deleted pet success done",
                status: true,
            });
        } else {
            res.send({
                message: "data not deleted because your pet no in your account",
                status: false
            })
        }
    } catch (error) {
        res.send(error);
    }
};
