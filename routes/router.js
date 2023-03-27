const controllers = require('../controllers/authcontroller');
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlaware/AuthMiddleware");


const bod = require('body-parser');
const path = require('path')



router.get('/examlistGet', verifyToken,controllers.examlistGet);
router.get('/studentdata',verifyToken,controllers.studentdataGet);


router.get('/home', verifyToken,controllers.homepageGet);
router.get('/exam_home', verifyToken,controllers.exam_homepageGet);
router.get('/result', verifyToken,controllers.resultpageGet);
router.get('/logout', verifyToken, controllers.logoutpageGet);

router.post('/profile_update', verifyToken, controllers.profile_updatepagePOST);

router.get('/', controllers.logingetpage);
router.get('/register', controllers.registerpage);
router.post('/register',  controllers.registerpost);
router.get('/login', controllers.logingetpage);
router.post('/login', controllers.loginpostpage);
router.get('/city',controllers.city);
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









// router.get('/examlist', controller.examlist);
router.get("/form1",controllers.form1);
router.get("/checkCode",controllers.validate_code);

module.exports=router;



module.exports = router;
