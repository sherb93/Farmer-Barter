const User = require('./user');
const Offer = require('./offer');
const Request = require('./request');

User.hasMany(Offer, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

Offer.belongsTo(User, {
  foreignKey: "user_id",
})

User.hasMany(Request, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

Request.belongsTo(User, {
  foreignKey: "user_id",
})

module.exports = { User, Offer, Request };
