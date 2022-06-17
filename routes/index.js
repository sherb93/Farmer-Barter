const express = require("express")
const apiRoutes = require('./api');
const homeRoutes = require("./homepage");
const loginRoutes = require("./loginpage")

const app = express();

app.use("/", homeRoutes)
app.use('/api', apiRoutes);
app.use('/login', loginRoutes);

module.exports = app;