const controller = require('../controllers/authcontroller');
const express = require("express");
const router = express.Router();

router.get('/examlistGet', controller.examlistGet);
router.get('/studentdata',controller.studentdataGet);
router.get('/examdata', controller.accesscodeGet);

module.exports=router;