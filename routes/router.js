const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

router.get("/collection",controller.collection);

router.post("/insert",controller.insert)

router.get("/select",controller.select);

router.get("/filter",controller.filter)

router.get("/sort",controller.sort)

router.delete("/delete",controller.delete)

router.put("/update",controller.update)



module.exports = router;