const Listing = require("./models/listing");
const Review = require("./models/review");
// const {listingSchema,reviewSchema}=require("./schema.js")
const expressError =require("./utils/expressError.js");
const {listingSchema,reviewSchema}=require("./schema.js")

module.exports.isLogedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
      console.log(req.session.redirectUrl)
        req.flash("error","you must be login to creat new listing");
        res.redirect("/Login")
      }
      next()
}

module.exports.saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next()
};

module.exports.isOwner =async (req,res,next)=>{
  const {id}=req.params;
  let listing =await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currUser._id)){
    console.log(`/Listings${id}`)
    req.flash("success","you are not owner of this post")
    return res.redirect(`/Listings/${id}`)
  }
  next();
}

module.exports.isReviewAuthor = async(req,res,next)=>{
  const {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("success","you are not author of this review")
    return res.redirect(`/Listings/${id}`)
  }
  next()
}


module.exports.listingValidate = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new expressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.reviewValidate = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
      let errMsg = error.details.map((el)=>el.message).join(",");
      throw new expressError(400,errMsg)
  }
  else{
      next()
  }
};