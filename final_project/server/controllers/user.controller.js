const mongoose = require('mongoose');
const passport = require('passport');
const JWT = require('jsonwebtoken');
const _= require('lodash');
JWT_SECRETGOOGLE = 'codeworkrauthentication';

const User = mongoose.model('User');
signToken = user => {
  return JWT.sign({
    iss: 'QQ Music',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRETGOOGLE);
}

module.exports.register =async (req,res,next) =>{
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    // Check if there is a user with the same email
    let foundUser = await User.findOne({ "local.email": email });
    if (foundUser) { 
      return res.status(403).json({ error: 'Email is already in use'});
    }

    // Is there a Google account with the same email
    foundUser = await User.findOne({ 
      $or: [
        { "google.email": email },
      ] 
    });
    if (foundUser) {
      foundUser.methods.push('local')
      foundUser.local = {
        fullname:fullname,
        email: email, 
        password: password
      }
      await foundUser.save()
      // Generate the token
      const token = signToken(foundUser);
      // Respond with token
      res.cookie('access_token', token, {
        httpOnly: true
      });
      res.status(200).json({ success: true });
    }

  
    // Create a new user
    const user = new User({ 
      method: 'local',
      local: {
        fullname:fullname,
        email: email, 
        password: password
      }
    });

    await user.save();
    const token = signToken(user);
    // Send a cookie containing JWT
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ success: true });
  },


module.exports.authenticate  = (req,res,next) =>{
  //call for passaprt authentication
  passport.authenticate('local',(err,user,info) =>{
    //error from passport middleware
    if(err) return res.status(400).json(err);
    //registered user
    else if (user) return res.status(200).json({"token":user.generateJwt()});
    //unknown user or wrong password
    else return res.status(404).json(info);
  })(req,res);
}

module.exports.userProfile = (req,res,next) =>{
  User.findOne({_id:req._id},
    (err,user) =>{
      if(!user)
        return res.status(404).json({status:false,message:'User record not found.'});
      else
        return res.status(200).json({status:true,user:_.pick(user,['local.fullname','local.email'])});  
    }
  );
}

module.exports.googleOAuth = async(req,res,next) =>{
  console.log('req.user',req.user);
  const token = signToken(req.user);
  res.status(200).json({ token });

}