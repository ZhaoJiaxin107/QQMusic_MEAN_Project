const mongoose = require('mongoose');
var reviewSchema = new mongoose.Schema({
    title:{type:String,required:true},
    fullname:{type:String},
    text:{type:String,required:true},
    rating:{type:Number},
    time:{type:Date}
});

mongoose.model('Review',reviewSchema);
