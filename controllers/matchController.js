const models = require("../models");
const Pet = models.pet;
const Match = models.match;
const Species = models.species;
const User = models.users;
const Profile = models.profile;

exports.show = async (req, res) => {
  try {
    const { pet_id, pet_id_like } = req.query;
    const data = await Match.findOne({
      include: [
        {
          model: Pet,
          as: "pet",
          attributes: {
            exclude: ["createdAt", "updatedAt", "speciesId"]
          },
          include: [
            {
              model: Species,
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            },
            {
              model: User,
              attributes: {
                exclude: ["createdAt", "updatedAt", "password", "profileId"]
              },
              include: [
                {
                  model: Profile,
                  attributes: {
                    exclude: ["createdAt", "updatedAt"]
                  }
                }
              ]
            }
          ]
        },
        {
          model: Pet,
          as: "pet_like",
          attributes: {
            exclude: ["createdAt", "updatedAt", "speciesId"]
          },
          include: [
            {
              model: Species,
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            },
            {
              model: User,
              attributes: {
                exclude: ["createdAt", "updatedAt", "password", "profileId"]
              },
              include: [
                {
                  model: Profile,
                  attributes: {
                    exclude: ["createdAt", "updatedAt"]
                  }
                }
              ]
            }
          ]
        }
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "petId", "petIdLike"]
      },
      where: { petId: pet_id, petIdLike: pet_id_like }
    });
    res.send({
      message: "Checked Data Match",
      status: true,
      data
    });
  } catch (error) {
    console.log(error);
  }
};

exports.insert = async (req, res) => {
  try {
    const { pet_id, pet_id_like } = req.body;
    const data = await Match.create({
      petId: pet_id,
      petIdLike: pet_id_like,
      status: false
    });
    res.send({
      message: "created data successfully",
      status: true,
      data
    });
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    await Match.update(
      {
        status: true
      },
      {
        where: { id: req.params.id }
      }
    );

    const data = await Match.findOne({
      include: [
        {
          model: Pet,
          as: "pet",
          attributes: {
            exclude: ["createdAt", "updatedAt", "speciesId"]
          },
          include: [
            {
              model: Species,
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            },
            {
              model: User,
              attributes: {
                exclude: ["createdAt", "updatedAt", "password", "profileId"]
              },
              include: [
                {
                  model: Profile,
                  attributes: {
                    exclude: ["createdAt", "updatedAt"]
                  }
                }
              ]
            }
          ]
        },
        {
          model: Pet,
          as: "pet_like",
          attributes: {
            exclude: ["createdAt", "updatedAt", "speciesId"]
          },
          include: [
            {
              model: Species,
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            },
            {
              model: User,
              attributes: {
                exclude: ["createdAt", "updatedAt", "password", "profileId"]
              },
              include: [
                {
                  model: Profile,
                  attributes: {
                    exclude: ["createdAt", "updatedAt"]
                  }
                }
              ]
            }
          ]
        }
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "petId", "petIdLike"]
      },
      where: { id: req.params.id }
    });
    res.status(200).send({
      message: "status updated true",
      status: true,
      data
    });

    // const { pet_id, pet_id_like } = req.query;
    // const verifyMatch = await Match.findOne({
    //   where: { petId: pet_id_like }
    // });

    // if (verifyMatch) {
    //   //update for status in table match
    //   await Match.update(
    //     {
    //       status: true
    //     },
    //     {
    //       where: { id: verifyMatch.id }
    //     }
    //   );

    //   const data = Match.findOne({
    //     where: {
    //       $or: [
    //         {
    //           petId: pet_id_like
    //         },
    //         {
    //           petIdlike: pet_id
    //         }
    //       ]
    //     }
    //   });
    //   res.send({
    //     message: "Your pet is favored by other pet updates true match",
    //     status: true,
    //     data
    //   });
    // } else if (!verifyMatch) {
    //   //create in table match
    //   const data = await Match.create({
    //     petId: pet_id,
    //     petIdLike: pet_like_id
    //   });
    //   res.status(204).send({
    //     message:
    //       "Your pet does not match by another pet and created pet id like",
    //     status: true,
    //     data
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
};
