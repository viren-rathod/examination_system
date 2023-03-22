const controller = require('../controllers/authcontroller');
const express = require("express");
const router = express.Router();


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



module.exports = router;