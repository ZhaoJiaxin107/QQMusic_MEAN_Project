const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:'email can not be empty!',
        unique:true
    },
    password:{
        type:String,
        required:'password can not be empty!',
        minlength:[4,'Password must be at least 4 characters.']
    },
    saltSecret:String
});
//Custom validation for email
userSchema.path('email').validate((val) =>{
    emailRegex =/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(val);
},'Invalid e-mail.');
//Events
userSchema.pre('save',function(next){
    bcrypt.genSalt(10,(err,salt) =>{
        bcrypt.hash(this.password,salt,(err,hash) =>{
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

//Methods
userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

userSchema.methods.generateJwt = function(){
    return jwt.sign({_id:this._id},
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXP
        });
}

mongoose.model('User',userSchema);