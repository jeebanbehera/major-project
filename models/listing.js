const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema= new Schema ({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String
    },  
    location:String,
    price:Number,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type:String,
        enum:["rooms","treading","pools","top citys","castles", "arctic","lake","mountain","sky-in/out","building"],
    }
});

listingSchema.post("findOneAndDelete",async(Listing)=>{
    if(Listing){
        await Review.deleteMany({_id:{$in: Listing.reviews}})
    }
})

const Listing = mongoose.model("Listing" , listingSchema);
module.exports=Listing;