const User = require("../models/user.js")

module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signUp.ejs")
}

module.exports.signUp = async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        let newUser = new User({username, email});
        let registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err)
            }
            else{
                req.flash("success","welcome to wanderlust");
                res.redirect("/Listings")
            }
        })

    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup")
    }
    
};


module.exports.renderLoginForm = async(req,res)=>{
    res.render("users/login.ejs")
};

module.exports.login =async(req,res)=>{
    req.flash("success","welcome back to wanderlust");
    if(res.locals.redirectUrl){
        res.redirect(res.locals.redirectUrl)
    }
    else{
        res.redirect("/Listings")
    }
};

module.exports.logOut = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return err
        }
        else{
            req.flash("success","you are successfully logout")
            res.redirect("/Listings")
        }
    })
}