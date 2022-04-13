const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

router.get("/collection",controller.controller);

router.post("/insert",controller.controller2)

router.get("/select",controller.controller3)

router.get("/filter",controller.controller4)

router.get("/sort",controller.controller5)

router.delete("/delete",controller.controller6)

router.put("/update",controller.controller6)



module.exports = router;