const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    method:{
        type:String,
        enum:['local','google'],
        required:true
    },
    local:{
        fullname:{
            type:String,
        },
        email:{
            type:String,
        },
        password:{
            type:String,
            minlength:[4,'Password must be at least 4 characters.']
        },
        saltSecret:String
    },
    google:{
        id:{
            type:String
        },
        email:{
            type:String
        }
    }
});
//Custom validation for email
userSchema.path('local.email').validate((val) =>{
    emailRegex =/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(val);
},'Invalid e-mail.');

//Events
userSchema.pre('save',function(next){
    if(this.method !== 'local'){
        next();
    }
    bcrypt.genSalt(10,(err,salt) =>{
        bcrypt.hash(this.local.password,salt,(err,hash) =>{
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

//Methods
userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password,this.local.password);
};

userSchema.methods.generateJwt = function(){
    return jwt.sign({_id:this._id},
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXP
        });
}

mongoose.model('User',userSchema);