const mongoose = require('mongoose');
var songSchema = new mongoose.Schema({
    header:{ type:String,default:'TAG'},
    title:{ type:String,required:true},
    artist:{ type:String,required:true },
    album:{ type:String },
    year:{ type:Number },
    comment:{ type:String},
    reserve:{ type:String },
    track:{ type:Number},
    genre:{ type:String },
    score:{ type:Number,required:true}
});

mongoose.model('Song',songSchema);
