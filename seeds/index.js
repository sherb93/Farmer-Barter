const sequelize = require("../config/connection");
const { User, Offer, Request } = require("../models");

const userSeeds = require("./user-data.json")
const offerSeeds = require("./offer-data.json")
const requestSeeds = require("./request-data.json")


const seedTables = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeeds);

    for (const offer of offerSeeds) {
        await Offer.create({
            ...offer,
            user_id: users[Math.floor(Math.random() * users.length)].id
        });
    };

    for (const request of requestSeeds) {
        await Request.create({
            ...request,
            user_id: users[Math.floor(Math.random() * users.length)].id
        });
    };

    process.exit(0);
};

seedTables();