const mongoose = require('mongoose');
var sd = require('silly-datetime');
const Review = mongoose.model('Review');
var ObjectId = require('mongoose').Types.ObjectId;
//create review
module.exports.addReview = (req, res, next) => {
    var review = new Review();
    review.title = req.body.title;
    review.fullname = req.body.fullname;
    review.text = req.body.text;
    review.rating = req.body.rating;
    review.time = sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
    review.save((err, doc) => {
        if (!err)
            res.send(doc);
        else 
            return next(err);
    });
}
//read reviews
module.exports.showreviews = (req,res,next) =>{
    Review.find((err, docs) => {
        if (!err) {res.send(docs); }
        else { console.log('Error in Retriving Reviews :' + JSON.stringify(err, undefined, 2)); }
    });
}


