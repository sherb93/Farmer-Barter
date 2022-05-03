const sequelize = require("../config/connection");
const { User, Offer, Request } = require("../models");

const userSeeds = require("./user-data.json")
const offerSeeds = require("./offer-data.json")
const requestSeeds = require("./request-data.json")


const seedTables = async () => {
    await sequelize.sync({ plain: true });

    const users = await User.bulkCreate(userSeeds);

    for (const offer of offerSeeds) {
        const newOffer = await Offer.create({
            ...offer,
            user_id: users[Math.floor(Math.random() * users.length)].id
        });
    }
}





seedTables();