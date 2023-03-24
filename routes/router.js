const controllers = require('../controllers/authcontroller');
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlaware/AuthMiddleware");



router.get('/examlistGet', verifyToken,controllers.examlistGet);
router.get('/studentdata',verifyToken,controllers.studentdataGet);


router.get('/home', verifyToken,controllers.homepageGet);
router.get('/exam_home', verifyToken,controllers.exam_homepageGet);
router.get('/result', verifyToken,controllers.resultpageGet);
router.get('/logout', verifyToken, controllers.logoutpageGet);

router.post('/profile_update', verifyToken, controllers.profile_updatepagePOST);

router.get('/', controllers.logingetpage);
router.get('/register', verifyToken, controllers.registerpage);
router.post('/register',verifyToken,  controllers.registerpost);
router.get('/login', controllers.logingetpage);
router.post('/login', controllers.loginpostpage);
router.get('/city', verifyToken,controllers.city);
router.get('/forget', controllers.forgetGet);
router.get('/setPassword', controllers.setPasswordGet);
router.post('/setPassword', controllers.setPasswordPost);
router.post('/fetch_api', controllers.sendOtp);
router.get('/updatePassword', controllers.updatePasswordGet);
router.post('/updatePassword', controllers.updatePasswordPost);
router.post('/active/:resultRandom', verifyToken, controllers.activePost);
router.post('/valid1',verifyToken, controllers.validPost);
router.post('/changePassword', controllers.changePasswordPost);
router.post('/validPassword', controllers.validPassword);


module.exports=router;