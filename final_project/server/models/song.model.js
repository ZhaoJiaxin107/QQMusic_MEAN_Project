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

