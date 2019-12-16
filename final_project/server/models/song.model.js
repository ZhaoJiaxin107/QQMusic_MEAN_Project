const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var songSchema = new mongoose.Schema({
    status:{ type:Boolean,default:true},
    header:{ type:String,default:'TAG'},
    title:{ type:String,required:true},
    artist:{ type:String,required:true },
    album:{ type:String },
    year:{ type:Number },
    comment:{ type:String},
    reserve:{ type:String },
    track:{ type:Number},
    genre:{ type:String },
    review:{type:String},
    num:{type:Number},
    score:{ type:Number,required:true}
});

mongoose.model('Song',songSchema);

