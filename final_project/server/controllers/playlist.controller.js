const mongoose = require('mongoose');
const Playlist = mongoose.model('Playlist');
var ObjectId = require('mongoose').Types.ObjectId;
//create playlist
module.exports.addPlaylist = (req, res, next) => {
    var playlist = new Playlist();
    playlist.status = req.body.status;
    playlist.playlisttitle = req.body.playlisttitle.replace(/</g,'&lt;').replace(/>/g,'&gt;');
    playlist.description = req.body.description.replace(/</g,'&lt;').replace(/>/g,'&gt;');
    playlist.fullname = req.body.fullname;
    playlist.title = req.body.title.replace(/</g,'&lt;').replace(/>/g,'&gt;');
    playlist.artist = req.body.artist;
    playlist.save((err, doc) => {
        if (!err)
            res.send(doc);
        else 
            return next(err);
    });
}
//read playlist
module.exports.showPlaylists = (req,res,next) =>{
    Playlist.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving songs :' + JSON.stringify(err, undefined, 2)); }
    });
}
//update playlist
module.exports.updatePlaylist =(req,res,next) =>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var playlist = {
        status: req.body.status,
        playlisttitle: req.body.playlisttitle.replace(/</g,'&lt;').replace(/>/g,'&gt;'),
        description: req.body.description.replace(/</g,'&lt;').replace(/>/g,'&gt;'),
        fullname: req.body.fullname,
        title:req.body.title.replace(/</g,'&lt;').replace(/>/g,'&gt;'),
        artist:req.body.artist.replace(/</g,'&lt;').replace(/>/g,'&gt;')
    };
    Playlist.findByIdAndUpdate(req.params.id, { $set: playlist }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Playlist Update :' + JSON.stringify(err, undefined, 2)); }
    });

}
//delete playlist
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



