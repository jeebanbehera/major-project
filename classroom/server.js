const express = require ("express");
const app = express();
const user = require ("./routes/user.js")
const post = require ("./routes/user.js")
const cookieParser = require("cookie-parser")
const session = require("express-session");
const flash = require("connect-flash")
const path = require("path")

app.use(cookieParser("secretcode"));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"))


const seasonOption = {secret:"mysupersecretstring", resave:false ,saveUninitialized:true }

app.use(session(seasonOption));
app.use(flash())
app.use((req,res,next)=>{
    res.locals.msg = req.flash("success")
    res.locals.err = req.flash("error");
    next()
})


app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name
    if(name==="anonymous"){
        req.flash("error","user not found")
    }
    else{
        req.flash("success","user register successfully")
    }
    res.redirect("/hello")
});

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name: req.session.name})
})
// app.get("/test",(req,res)=>{
//     res.send("test successful")
// })

app.get("/reqCount",(req,res)=>{
    if(req.session.count){
        req.session.count++
    }
    else{
        req.session.count = 1
    }
    res.send(`you sent a request ${req.session.count} times`)
})

// app.get("/signedcookie",(req,res)=>{
//     res.cookie("made-in", "usa",{signed:true});
//     res.send("signed cookie send")
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verifyed")
// })


// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet" ,"namaste");
//     res.cookie("madein", "India");
//     res.send("send you some cookies")
// })

// app.get("/greet",(req,res)=>{
//     let {name="anonymous"} = req.cookies;
//     res.send(`hi ${name}`)
// })

// app.get("/",(req,res)=>{
//     console.dir(req.cookies)
//     res.send("i am root")
// });

// app.use("/user",user)
// app.use("/post",post);




app.listen(3000,()=>{
    console.log("app listen on post 3000")
});
