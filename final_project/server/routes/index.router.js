const express = require('express');
const router = express.Router();
const passport = require('passport');
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);

router.route('/oauth/google').post(passport.authenticate('googleToken',{ session:false }));
module.exports = router;