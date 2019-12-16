const mongoose = require('mongoose');

const Song = mongoose.model('Song');
var ObjectId = require('mongoose').Types.ObjectId;
//create a song
module.exports.addsong = (req, res, next) => {
    var song = new Song();
    song.status = req.body.status;
    song.header = req.body.header;
    song.title = req.body.title;
    song.artist = req.body.artist;
    song.album = req.body.album;
    song.year = req.body.year;
    song.comment = req.body.comment;
    song.reserve = req.body.reserve;
    song.track = req.body.track;
    song.genre = req.body.genre;
    song.review = req.body.review;
    song.num = req.body.num;
    song.score = req.body.score;
    song.save((err, doc) => {
        if (!err)
            res.send(doc);
        else 
            return next(err);
    });
}
//read songs
module.exports.showsongs = (req,res,next) =>{
    Song.find((err, docs) => {
        if (!err) {res.send(docs); }
        else { console.log('Error in Retriving Songs :' + JSON.stringify(err, undefined, 2)); }
    });
}
//read unhidden songs
module.exports.showTruesongs = (req,res,next) =>{
    Song.find({status:true},
        (err,docs)=>{
            if (!err) {res.send(docs); }
            else { console.log('Error in Retriving Songs :' + JSON.stringify(err, undefined, 2));
          }  });
}
// read specific song
module.exports.showOnesong = (req,res,next) =>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

    Song.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Retriving Songs :' + JSON.stringify(err, undefined, 2)); }
});
}
//admin hide song
module.exports.adminHideSong = (req, res, next) => {
    Song.findByIdAndUpdate(
      req.params.id,
      {
        $set: { status : false}
      },
      {
        new: true
      },
      (err, updated) => {
        if (err) {
          res.send("Error in hide this song!");
        } else {
          res.json(updated);
        }
      }
    );
  };
  //admin show song
  module.exports.adminShowSong = (req, res, next) => {
    Song.findByIdAndUpdate(
      req.params.id,
      {
        $set: { status : true}
      },
      {
        new: true
      },
      (err, updated) => {
        if (err) {
          res.send("Error in show this song!");
        } else {
          res.json(updated);
        }
      }
    );
  };