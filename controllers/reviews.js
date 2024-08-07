const Listing = require("../models/listing.js")
const Review = require("../models/review.js")

module.exports.createReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    // console.log(newReview);
    // console.log(listing);
    // console.log(listing.reviews)
    listing.reviews.push(newReview);
    newReview.author = req.user._id;
    console.log(req.user._id)
    await newReview.save();
    req.flash("success", "New review added !")
    await listing.save();

    console.log("new review saved");
    // res.send("new revew saved");
    res.redirect(`/Listings/${listing.id}`)
};


module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted !")
    res.redirect(`/Listings/${id}`)
}