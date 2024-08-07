const Listing=require("../models/listing");

// module.exports.index = async(req,res)=>{
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs",{allListings})
//     // res.send("working")
// };

module.exports.index = async(req,res)=>{
    
  const allListings = await Listing.find({});
  console.log(allListings)
  res.render("listings/index.ejs",{allListings})
  // res.send("working")
};


module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs")
};


module.exports.showListing = async(req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews",populate:{path:"author"},}).populate("owner")
    if(!listing){
      req.flash("error","Listing you requested for does not exit !")
      res.redirect("/Listings")
    }
    else{
      res.render("listings/show.ejs",{listing})
    }

    
};


module.exports.createListing = async(req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing=new Listing(req.body.listing)
    newListing.owner = req.user._id
    newListing.image = {url,filename}
    await newListing.save()
    req.flash("success", "new listing added successfully")
// .then(res => console.log(res))
// .catch(err => console.log(err))
    res.redirect("/Listings")  
};

module.exports.renderEditForm = async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id)
    if(!listing){
      req.flash("error","Listing you requested for does not exit !")
      res.redirect("/Listings")
    }

      let originalImageUrl = listing.image.url;
      originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250")
      res.render("listings/edit.ejs",{listing,originalImageUrl})
};

module.exports.updateListing = async(req,res)=>{
    const {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    console.log("hi")

    if(typeof req.file !=="undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url,filename};
      await listing.save()
    }
    req.flash("success","Review edited")
    res.redirect(`/Listings/${id}`)
};

module.exports.destroyLisying = async(req,res)=>{
    let {id}=req.params;
    const deleted = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted successfully")
    res.redirect("/Listings")
}