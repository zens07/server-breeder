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
    ],
    where: { id: req.params.id }
  });
  res.send({
    data
  });
};
exports.insert = async (req, res) => {
  try {
    const userIdToken = req.user.userId;
    const { name_pet, gender, species_id, age, about_pet, photo } = req.body;
    const createdPet = await Pet.create({
      name: name_pet,
      gender,
      age,
      photo,
      about: about_pet,
      speciesId: species_id,
      userId: userIdToken
    });
    const data = await Pet.findOne({
      include: [
        {
          model: Species,
          attributes: { exclude: ["password", "createdAt", "updatedAt"] }
        },
        {
          model: User,
          attributes: { exclude: ["password", "createdAt", "updatedAt"] }
        }
      ],
      attributes: {
        exclude: ["speciesId", "userId", "createdAt", "updatedAt"]
      },
      where: { id: createdPet.id }
    });
    res.send({
      data,
      message: "created another Pet done",
      status: "true"
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "No authenticated, login for authenticated",
      status: false
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const { name_pet, gender, species_id, age, about_pet, photo } = req.body;
    const verifyPet = await Pet.findOne({
      where: { id: req.params.id, userId: req.user.userId }
    });
    if (verifyPet) {
      await Pet.update(
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

      const data = await Pet.findOne({
        include: [
          {
            model: Species,
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"]
            }
          },
          {
            model: User,
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"]
            }
          }
        ],
        attributes: {
          exclude: ["speciesId", "userId", "createdAt", "updatedAt"]
        },
        where: { id: req.params.id }
      });
      res.send({
        message: "Data is updating success",
        status: true,
        data
      });
    } else {
      res.status(400).send({
        message: "No Data Pet in your account",
        status: false
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "No authenticated, login for authenticated",
      status: false
    });
  }
};

exports.deleted = async (req, res) => {
  try {
    const verifyPet = await Pet.findOne({
      where: { id: req.params.id, userId: req.user.userId }
    });
    if (verifyPet) {
      await Pet.destroy({
        where: { id: req.params.id }
      });
      res.send({
        message: "deleted pet success done",
        status: true
      });
    } else {
      res.status(400).send({
        message: "Not Found your pet",
        status: false
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "No authenticated, login for authenticated",
      status: false
    });
  }
};
