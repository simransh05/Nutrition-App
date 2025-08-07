module.exports.getProfile = (req,res,next)=>{
    if(!req.session.user){
        return res.redirect('/login')
    }
    res.render('profile',{
        user:req.session.user
})
}
