const User = require('../models/userSchema')

async function handleUserSignup(req,res){
    const { name, email, password} = req.body;
    await User.create({
        name, email, password,
    });
    return res.render("/")
}
async function handleUserLogin(req,res){
    const { name, email, password} = req.body;
    await User.findOne({
         email, password,
    });
    if(!User)
        return res.render("login",{
            error:"Invalid Username or Password",
        })
    return res.redirect("/")
}
module.exports = {handleUserSignup,handleUserLogin}