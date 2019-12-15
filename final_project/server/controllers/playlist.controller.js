const mongoose = require('mongoose');
const Playlist = mongoose.model('Playlist');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports.addPlaylist = (req, res, next) => {
    var playlist = new Playlist();
    playlist.status = req.body.status;
    playlist.playlisttitle = req.body.playlisttitle;
    playlist.description = req.body.description;
    playlist.fullname = req.body.fullname;
    playlist.title = req.body.title;
    playlist.artist = req.body.artist;
    playlist.save((err, doc) => {
        if (!err)
            res.send(doc);
        else 
            return next(err);
    });
}
module.exports.showPlaylists = (req,res,next) =>{
    Playlist.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving songs :' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.updatePlaylist =(req,res,next) =>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

    var playlist = {
        status: req.body.status,
        playlisttitle: req.body.playlisttitle,
        description: req.body.description,
        fullname: req.body.fullname,
        title:req.body.title,
        artist:req.body.artist
    };
    Playlist.findOneAndUpdate(req.params.id, { $set: playlist }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Songs Update :' + JSON.stringify(err, undefined, 2)); }
});
}
module.exports.deletePlaylist = (req,res,next) =>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Playlist.findOneAndDelete(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Songs Delete :' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.showOneplaylist = (req,res,next) =>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

    Playlist.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Retriving Songs :' + JSON.stringify(err, undefined, 2)); }
});
}



