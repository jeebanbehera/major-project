const express = require("express");
const router = express.Router()


router.post("/",(req,res)=>{
    res,send("hi i am post")
})

router.delete("/:id",(req,res)=>{
    res.send("deleted")
})

module.exports = router();