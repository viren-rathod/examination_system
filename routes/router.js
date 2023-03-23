const controllers = require('../controllers/authcontroller');
const express = require("express");
const router = express.Router();

router.get('/examlistGet', controllers.examlistGet);
router.get('/studentdata',controllers.studentdataGet);

router.get("/setinterval", controllers.setintervalGet);

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


module.exports=router;