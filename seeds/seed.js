const sequelize = require('../config/connection');
const { User, Offer, Request } = require('../models');

const userData = require('./user-data.json');
const offerData = require('./offer-data.json');
const requestData = require('./request-data.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   for (const project of projectData) {
//     await Project.create({
//       ...project,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

//   process.exit(0);
// };

// seedDatabase();