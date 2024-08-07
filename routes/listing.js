const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync =require("../utils/wrapAsync.js");
// const expressError =require("../utils/expressError.js");
// const {listingSchema,reviewSchema}=require("../schema.js")
const session = require("express-session");
const flash = require("connect-flash")
const {isLogedIn,isOwner,listingValidate} = require("../midileware.js")

const listingController = require("../controllers/listings.js")
const multer  = require('multer');
const{storage} = require("../cloudConfig.js")
const upload = multer({ storage })


router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLogedIn,
    upload.single('listing[image]'),
    listingValidate,
    wrapAsync(listingController.createListing)
  )
  // .post(upload.single('listing[image]'),(req,res)=>{
  //   res.send(req.file)
  // })
 
        // NEW route
   router.get("/new",isLogedIn,listingController.renderNewForm)

   router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
      isLogedIn,
      isOwner,
      upload.single('listing[image]'),
      listingValidate,
      wrapAsync(listingController.updateListing))
    .delete(
      isLogedIn,
      isOwner,
      wrapAsync(listingController.destroyLisying))

      
       //edit route
   router.get("/:id/edit",
    isLogedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
  );
    

    
    

module.exports = router;