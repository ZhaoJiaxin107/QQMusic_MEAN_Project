const express = require('express');
const router = express.Router();
const passport = require('passport');
const ctrlUser = require('../controllers/user.controller');
const ctrlSong = require('../controllers/song.controller');
const jwtHelper = require('../config/jwtHelper');
const passportGoogle = passport.authenticate('googleToken',{session:false})


router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);
router.get('/activate/:token',ctrlUser.activateUser);
router.route('/oauth/google').post(passportGoogle,ctrlUser.googleOAuth);
router.post('/song',ctrlSong.addsong);
router.get('/song',ctrlSong.showsongs);
module.exports = router;