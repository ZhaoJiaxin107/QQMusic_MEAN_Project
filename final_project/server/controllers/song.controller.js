const mongoose = require('mongoose');

const Song = mongoose.model('Song');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports.addsong = (req, res, next) => {
    var song = new Song();
    song.header = req.body.header;
    song.title = req.body.title;
    song.artist = req.body.artist;
    song.album = req.body.album;
    song.year = req.body.year;
    song.comment = req.body.comment;
    song.reserve = req.body.reserve;
    song.track = req.body.track;
    song.genre = req.body.genre;
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

module.exports.showOnesong = (req,res,next) =>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

    Song.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Retriving Songs :' + JSON.stringify(err, undefined, 2)); }
});
}
