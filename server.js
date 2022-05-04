const express = require('express');
const sequelize = require('./config/connection');
const controllers = require('./controllers');
const { create } = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const hbs = create({});
const PORT = process.env.PORT || 3001;

const models = require('./models');

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

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on routes
app.use(controllers);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});