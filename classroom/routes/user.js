const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("hi i am user")
});

router.get("/:id",(req,res)=>{
    res.send("hi i am user id")
})




module.exports = router;