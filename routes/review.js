const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js")
const wrapAsync =require("../utils/wrapAsync.js")
// const expressError =require("../utils/expressError.js");
// const {reviewSchema}=require("../schema.js");
const Review = require("../models/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const { reviewValidate,isLogedIn,isReviewAuthor } = require("../midileware.js");

const reviewController = require("../controllers/reviews.js")




//review post route
router.post("/",isLogedIn,wrapAsync(reviewController.createReview));

//review delete route
router.delete("/:reviewId",isLogedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));


module.exports = router;