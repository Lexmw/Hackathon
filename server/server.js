const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.static("dist"));

module.exports = app;
