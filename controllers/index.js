const express = require("express")
const apiRoutes = require('./api');
const homeRoutes = require("./homepage");

const app = express();

app.use('/api', apiRoutes);
app.use("/", homeRoutes)

module.exports = app;
