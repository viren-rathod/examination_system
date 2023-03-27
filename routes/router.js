const controller = require('../controllers/authcontroller');
const express = require("express");
const router = express.Router();

router.get('/examGet', controller.examGet);
router.get('/categoryGet', controller.categoryGet);
router.get('/errorPage', controller.errorPage);

module.exports=router;