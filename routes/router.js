const express = require('express');
//router object
const router = express.Router();

const bod = require('body-parser');
const path = require('path')

const controllers = require('../controllers/authcontroller');

router.get('/home', controllers.homepageGet);
router.get('/exam_home', controllers.exam_homepageGet);
router.get('/result', controllers.resultpageGet);
router.get('/logout', controllers.logoutpageGet);

router.post('/profile_update', controllers.profile_updatepagePOST);



router.get('/', controllers.logingetpage);
router.get('/register', controllers.registerpage);
router.post('/register', controllers.registerpost);
router.get('/login', controllers.logingetpage);
router.post('/login', controllers.loginpostpage);
router.get('/city', controllers.city);
router.get('/forget', controllers.forgetGet);
router.get('/setPassword', controllers.setPasswordGet);
router.post('/setPassword', controllers.setPasswordPost);
router.post('/fetch_api', controllers.sendOtp);
router.get('/updatePassword', controllers.updatePasswordGet);
router.post('/updatePassword', controllers.updatePasswordPost);
router.post('/active/:resultRandom', controllers.activePost);
router.post('/valid1', controllers.validPost);
router.post('/changePassword', controllers.changePasswordPost);
router.post('/validPassword', controllers.validPassword);
router.post('/profilePassword', controllers.updateProfilePassword);





// const controller=require("../controllers/authcontroller.js");
// router.use(express.static(path.join(__dirname + '../public')));
// router.use(express.static(path.join(__dirname + '../public/images')));
// router.use(express.static(path.join(__dirname + '../public/css')));
// router.use(express.static(path.join(__dirname + '/public/js')));
// router.use(bod.json());
// router.use(bod.urlencoded({ extended: false }))





// router.get('/examlist', controller.examlist);
router.get("/form1", controllers.form1);
router.get("/checkCode", controllers.validate_code);

module.exports = router;