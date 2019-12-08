const mongoose = require('mongoose');
var songSchema = new mongoose.Schema({
    songname:{
        type:String
    },
    singer:{
        type:String
    },
    score:{
        type:Number
    }
});

mongoose.model('Song',songSchema);

var songSchema = new mongoose.Schema({
    songname: { type: String },
    singer: { type: String },
    score: { type: Number }

});

const Song = mongoose.model('Song',songSchema);
