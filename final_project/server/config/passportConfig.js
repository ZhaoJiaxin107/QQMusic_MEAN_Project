const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
var User = mongoose.model('User');
//local strategy
passport.use(
    new localStrategy({usernameField:'email'},
    (username,password,done) => {
        User.findOne({"local.email":username},
            (err,user) => {
                if(err)
                    return done(err);
                //unknown user
                else if(!user)
                    return done(null,false,{message:'Email is not registered.'});
                //wrong password
                else if(!user.verifyPassword(password))
                    return done(null,false,{message:'Your password is wrong.'});
                //authentication succeed
                else
                    return done(null,user);
            });
    })

);

//Google OAuth Strategy
passport.use('googleToken',new GooglePlusTokenStrategy({
    clientID:'242896001594-m6n1m47msroiut12esi21u0pr1o87nt4.apps.googleusercontent.com',
    clientSecret:'FEyDPAKFgHWdfBd-ZnLaOsnv'
    },async(accessToken,refreshToken,profile,done) =>{
    try{
        console.log('accessToken',accessToken);
        console.log('refreshToken',refreshToken);
        console.log('profile',profile);

        //check whether this current user exists in our database
        const existingUser = await User.findOne({"google.id" : profile.id });
        console.log(existingUser);
        if(existingUser){
            console.log('User alreay exists in our database.');
            return done(null,existingUser);
        }
        console.log('User does not exists, we are creating a new one');
        //If new account
        const newUser = new User({
            method:'google',
            google:{
                id:profile.id,
                email:profile.emails[0].value
            }
        });
        
        await newUser.save();
        done(null,newUser);
    }catch(error){
        done(error,false,error.message);
    }
}));