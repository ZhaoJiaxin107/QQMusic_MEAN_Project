const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
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
        saltSecret:String,
        active:{
            type:Boolean,
            required:true,
            default:false
        },
        temporarytoken:{
            type:String,
            required:true
        }
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
userSchema.pre('save',async function(next){
    if(this.method !== 'local'){
        next();
    }
    const user = this;
    //check if the user has been modified to know if the password has already been hashed
    if (!user.isModified('local.password')) {
      next();
    }
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    // Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;
    next();
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