require("dotenv/config");
const Cache = require("node-cache");
const cache = new Cache();
const app = require("express").Router();
const { CACHE_LIFE_SECONDS, REQUESTS_CACHE_LIFE } = process.env;
app.use(async (req, res, next) => {
  try {
    const ip = req.socket.remoteAddress || req.headers["X-Fowarded-For"];
    const result = cache.get(ip);

    console.log(`IP requesting:${ip} Requests:${result ? result : 1}`);

    if (result) {
      cache.set(ip, result + 1, CACHE_LIFE_SECONDS);
      if (result > REQUESTS_CACHE_LIFE) return res.sendStatus(403);
    } else cache.set(ip, 1, CACHE_LIFE_SECONDS);

    next();
  } catch (ex) {
    console.error(ex);
    res.sendStatus(500);
  }
});

module.exports = app;
