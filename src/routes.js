const app = require("express").Router();

app.get("/", (_, res) => res.sendStatus(200));

module.exports = app;
    