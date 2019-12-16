const express = require('express');
const router = express.Router();
const passport = require('passport');
const ctrlUser = require('../controllers/user.controller');
const ctrlSong = require('../controllers/song.controller');
const ctrlReview = require('../controllers/review.controller');
const ctrlPlaylist = require('../controllers/playlist.controller');
const jwtHelper = require('../config/jwtHelper');
const passportGoogle = passport.authenticate('googleToken',{session:false})

//user part
router.post('/user/open/register',ctrlUser.register);
router.post('/user/open/authenticate',ctrlUser.authenticate);
router.get('/user/open/readUser',ctrlUser.showUsers);
router.get('/user/open/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);
router.get('/user/activate/:token',ctrlUser.activateUser);
router.route('/user/oauth/google').post(passportGoogle,ctrlUser.googleOAuth);
//admin part
router.put('/admin/secure/grantsm/:id',ctrlUser.updateAdmin);
router.put('/admin/secure/activateUser/:id',ctrlUser.adminSetActive);
router.put('/admin/secure/deactivateUser/:id',ctrlUser.adminSetDeActive);
//song part
router.post('/song/secure/createSong',ctrlSong.addsong);
router.get('/song/open/readSong',ctrlSong.showsongs);
router.get('/song/open/readSong/:id',ctrlSong.showOnesong);
router.get('/song/open/readTruesong',ctrlSong.showTruesongs);
router.put('/song/secure/hideSong/:id',ctrlSong.adminHideSong);
router.put('/song/secure/showSong/:id',ctrlSong.adminShowSong);
//review part
router.post('/review/secure/createReview',ctrlReview.addReview);
router.get('/review/open/readReview',ctrlReview.showreviews);

//playlist part
router.post('/playlist/secure/createPlaylist',ctrlPlaylist.addPlaylist);
router.get('/playlist/secure/readPlaylist',ctrlPlaylist.showPlaylists);
router.put('/playlist/secure/updatePlaylist/:id',ctrlPlaylist.updatePlaylist);
router.delete('/playlist/secure/deletePlaylist/:id',ctrlPlaylist.deletePlaylist);
router.get('/playlist/secure/readPlaylist/:id',ctrlPlaylist.showOneplaylist);


module.exports = router;