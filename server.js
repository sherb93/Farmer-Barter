const express = require('express');
const sequelize = require('./config/connection');
const controllers = require('./routes');
const { create } = require("express-handlebars"); 
const session = require("express-session"); // npm for adding session row to SQL tables
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const hbs = create({});
const PORT = process.env.PORT || 3001;

// session options
const sess = {
  secret: 'Super secret secret',
  cookie: {
      maxAge: 86400000,
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
      db: sequelize,
  })
};

// MIDDLEWARE
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// HANDLEBARS ENGINE
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on routes
app.use(controllers);

// start connection to db - then server. GET request made at "/" renders homepage.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});