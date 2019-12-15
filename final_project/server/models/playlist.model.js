const mongoose = require('mongoose');
var playlistSchema = new mongoose.Schema({
    status:{type:Boolean,required:true},
    playlisttitle:{type:String},
    description:{type:String},
    fullname:{type:String,required:true},
    title:{type:String,required:true},
    artist:{type:String}
   
});

mongoose.model('Playlist',playlistSchema);