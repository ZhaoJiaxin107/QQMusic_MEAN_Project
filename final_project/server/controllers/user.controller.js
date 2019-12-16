const mongoose = require('mongoose');
const passport = require('passport');
const JWT = require('jsonwebtoken');
const _= require('lodash');
var secret = 'harrypotter';
var JWT_SECRETGOOGLE = 'codeworkrauthentication';
const User = mongoose.model('User');
var nodemailer = require('nodemailer'); // Import Nodemailer Package
var sgTransport = require('nodemailer-sendgrid-transport');
signToken = user => {
  return JWT.sign({
    iss: 'QQ Music',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRETGOOGLE);
}
// Start Sendgrid Configuration Settings	
var options = {
  auth: {
      api_user: 'jiaxin', // Sendgrid username
      api_key: 'Ncxs2019@' // Sendgrid password
  }
}
var client = nodemailer.createTransport(sgTransport(options));
// End Sendgrid Configuration Settings	
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
        password: password,
        temporarytoken:JWT.sign({fullname:fullname,email:email},secret,{expiresIn:'24h'})
      }
    });

    await user.save(function(err) {
      if (err) {
        // Check if any validation errors exists (from user model)
        if (err.errors != null) {
            res.json({ success: false, message: err }); // Display any other errors with validation
          }
        } else if (err) {
          // Check if duplication error exists
          if (err.code == 11000) {
            res.status(422).send(['Duplicate email adrress found.']);
          } else {
            res.json({ success: false, message: err }); // Display any other error
          }
      } else if(res.status(200)){
        // Create e-mail object to send to user
          
					var email = {
						from: 'QQ Music@qq music.com',
						to: user.local.email,
						subject: 'Localhost Activation Link',
						text: 'Hello '+ user.local.fullname,
            html: 'Hello<strong> ' + user.local.fullname + '</strong>,<br><br>You recently requested a new account activation link. Please click on the link below to complete your activation:<br><br><a href="http://localhost:3000/api/activate/' + user.local.temporarytoken + '">http://localhost:3000/api/activate/</a>'

					};
					// Function to send e-mail to the user
					client.sendMail(email, function(err, info) {
						if (err) console.log(err); // If error with sending e-mail, log to console/terminal
					});
          res.json({ success: true, message: 'Account registered! Please check your e-mail for activation link.' }); // Send success message back to controller/request
      }
    });
  }
  module.exports.activateUser  = async (req,res,next) =>{
    await User.findOne({ "local.temporarytoken": req.params.token }, function(err, user) {
			if (err) throw err; // Throw error if cannot login
			var token = req.params.token; // Save the token from URL for verification 
      console.log(token);
			if (!user) {
					res.json({ success: false, message: 'Activation link has expired.' }); // Token may be valid but does not match any user in the database
				} else {
					user.local.temporarytoken = false; // Remove temporary token
          user.local.active = true; // Change account status to Activated
          user.save(function(err) {
						if (err) {
              console.log(err); // If unable to save user, log error info to console/terminal
              var email = {
                from: 'Localhost Staff, staff@localhost.com',
                to: user.local.email,
                subject: 'Localhost Activation Link',
                text: 'Hello '+ user.local.fullname,
                html: 'Hello<strong> ' + user.local.fullname + '</strong>,<br><br>You recently requested a new account activation link. Please click on the link below to complete your activation:<br><br><a href="http://localhost:3000/api/activate/' + user.local.temporarytoken + '">http://localhost:3000/api/activate/</a>'
    
              };
              // Function to send e-mail to the user
              client.sendMail(email, function(err, info) {
                if (err) console.log(err); // If error with sending e-mail, log to console/terminal
              });
						} 
            res.json({ success: true, message: 'Account activated!' }); // Return success message to controller
					});
        }
          
      });
			
  }


module.exports.authenticate  = (req,res,next) =>{
  //call for passaprt authentication
  passport.authenticate('local',(err,user,info) =>{
    //error from passport middleware
    if(err) return res.status(400).json(err);
    //registered user
    else if(user.local.active == false) 
          return res.status(401).json({success: false, message: 'Please contact with administrator!'});
    else if (user.local.active == true) 
          return res.status(200).json({"token":user.generateJwt()});
    else return res.status(404).json(info);
  })(req,res);
}

module.exports.userProfile = (req,res,next) =>{
  User.findOne({_id:req._id},
    (err,user) =>{
      if(!user)
        return res.status(404).json({status:false,message:'User record not found.'});
      else
        return res.status(200).json({status:true,user:_.pick(user,['local.fullname','local.email','local.isAdmin'])});  
    }
  );
}

module.exports.googleOAuth = async(req,res,next) =>{
  console.log('req.user',req.user);
  const token = signToken(req.user);
  res.status(200).json({ token });

}
module.exports.showUsers = (req,res,next) =>{
  User.find((err, docs) => {
      if (!err) {res.send(docs); }
      else { console.log('Error in Retriving Users:' + JSON.stringify(err, undefined, 2)); }
  });
}

module.exports.updateAdmin = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: { ['local.isAdmin']: true}
    },
    {
      new: true
    },
    (err, updated) => {
      if (err) {
        res.send("Error in updating admin privilege!");
      } else {
        res.json(updated);
      }
    }
  );
};

module.exports.adminSetActive = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: { ['local.active']: true}
    },
    {
      new: true
    },
    (err, updated) => {
      if (err) {
        res.send("Error in updating admin privilege!");
      } else {
        res.json(updated);
      }
    }
  );
};

module.exports.adminSetDeActive = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: { ['local.active']: false}
    },
    {
      new: true
    },
    (err, updated) => {
      if (err) {
        res.send("Error in updating admin privilege!");
      } else {
        res.json(updated);
      }
    }
  );
};

