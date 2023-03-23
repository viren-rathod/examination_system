

const express = require('express');
const router = express();

const bod = require('body-parser');
const path = require('path')

const controller=require("../controllers/authcontroller.js");
router.use(express.static(path.join(__dirname + '../public')));
router.use(express.static(path.join(__dirname + '../public/images')));
router.use(express.static(path.join(__dirname + '../public/css')));
router.use(express.static(path.join(__dirname + '/public/js')));
router.use(bod.json());
router.use(bod.urlencoded({ extended: false }))

router.set('view engine', 'ejs');
router.set("views", "./views");




// router.get('/examlist', controller.examlist);
router.get("/form1",controller.form1);
router.get("/checkCode",controller.validate_code);

module.exports=router;


