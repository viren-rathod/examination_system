const express = require('express');
//router object
const router = express.Router();


const controllers = require('../controllers/authcontroller');

router.get('/home', controllers.homepageGet);
router.get('/exam_home', controllers.exam_homepageGet);
router.get('/result', controllers.resultpageGet);
router.post('/profile_update', controllers.profile_updatepagePOST);


module.exports = router;
