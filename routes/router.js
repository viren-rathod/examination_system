const express = require('express');
//router object
const router = express.Router();


const controller = require('../controller/authcontroller');

router.get('/home', controller.homepageGet);
router.get('/exam_home', controller.exam_homepageGet);
router.get('/result', controller.resultpageGet);
router.post('/profile_update', controller.profile_updatepagePOST);

module.exports = router;