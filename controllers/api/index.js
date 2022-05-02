const express = require("express")
const offerRoutes = require("./offer-routes");
const requestRoutes = require("./request-routes");

const app = express();

app.use('/offers', offerRoutes);
app.use("/requests", requestRoutes)

module.exports = app;
