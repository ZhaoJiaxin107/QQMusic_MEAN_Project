const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
mongoose.model('User',userSchema);