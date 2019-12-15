const express = require('express');
const router = express.Router();
const passport = require('passport');
const ctrlUser = require('../controllers/user.controller');
const ctrlSong = require('../controllers/song.controller');
const ctrlReview = require('../controllers/review.controller');
const ctrlPlaylist = require('../controllers/playlist.controller');
const jwtHelper = require('../config/jwtHelper');
const passportGoogle = passport.authenticate('googleToken',{session:false})


router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);
router.get('/activate/:token',ctrlUser.activateUser);
router.route('/oauth/google').post(passportGoogle,ctrlUser.googleOAuth);
router.post('/song',ctrlSong.addsong);
router.get('/song',ctrlSong.showsongs);
router.get('/song/:id',ctrlSong.showOnesong);
router.post('/review',ctrlReview.addReview);
router.get('/review',ctrlReview.showreviews);
router.post('/playlist',ctrlPlaylist.addPlaylist);
router.get('/playlist',ctrlPlaylist.showPlaylists);
router.put('/playlist/:id',ctrlPlaylist.updatePlaylist);
router.delete('/playlist/:id',ctrlPlaylist.deletePlaylist);
router.get('/playlist/:id',ctrlPlaylist.showOneplaylist);
module.exports = router;