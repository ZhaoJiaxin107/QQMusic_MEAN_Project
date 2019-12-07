const mongoose = require('mongoose');

const Song = mongoose.model('Song');

module.exports.addsong = (req, res, next) => {
    var song = new Song();
    song.songname = req.body.songname;
    song.singer = req.body.singer;
    song.score = req.body.score;
    song.save((err, doc) => {
        if (!err)
            res.send(doc);
        else 
            return next(err);
    });
}

module.exports.showsongs = (req,res,next) =>{
    Song.find((err, docs) => {
        if (!err) {res.send(docs); }
        else { console.log('Error in Retriving Songs :' + JSON.stringify(err, undefined, 2)); }
    });
}
