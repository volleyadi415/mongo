const express = require("express");
const router = express.Router();

const routes = require("./router");

router.use("/test", routes);

module.exports = router;