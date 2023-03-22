

const express = require('express');
const router = express();

const bod = require('body-parser');
const path = require('path')

const controller=require("../controllers/authcontroller.js");
router.use(express.static(path.join(__dirname + '../public')));
router.use(express.static(path.join(__dirname + '../public/images')));
router.use(express.static(path.join(__dirname + '../public/css_files')));
router.use(express.static(path.join(__dirname + '/public/scripts')));
router.use(bod.json());
router.use(bod.urlencoded({ extended: false }))

router.set('view engine', 'ejs');
router.set("views", "./views");



router.get('/exam',controller.exam)


router.get('/categoryGet', controller.categoryGet);
router.get('/pagingGet', controller.pagingGet);
router.get('/nextGet', controller.nextGet);
router.get('/prevGet', controller.prevGet);
router.post('/answerPost', controller.answerPost);


router.get('/', controller.logingetpage);
router.get('/register', controller.registerpage);
router.post('/register', controller.registerpost);
router.get('/login', controller.logingetpage);
router.post('/login', controller.loginpostpage);
router.get('/city', controller.city);
router.get('/forget', controller.forgetGet);
router.get('/setPassword', controller.setPasswordGet);
router.post('/setPassword', controller.setPasswordPost);
router.post('/fetch_api', controller.sendOtp);
router.get('/updatePassword', controller.updatePasswordGet);
router.post('/updatePassword', controller.updatePasswordPost);
router.post('/active/:resultRandom', controller.activePost);
router.post('/valid1', controller.validPost);
router.post('/changePassword', controller.changePasswordPost);
router.post('/validPassword', controller.validPassword);
router.get('/examlist', controller.examlist);

module.exports=router;


