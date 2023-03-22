const controller = require('../controllers/authcontroller');
const express = require("express");
const router = express.Router();

router.get('/examGet', controller.examGet);
router.get('/categoryGet', controller.categoryGet);
router.get('/pagingGet', controller.pagingGet);
router.get('/nextGet', controller.nextGet);
router.get('/prevGet', controller.prevGet);
router.post('/answerPost', controller.answerPost);

module.exports=router;