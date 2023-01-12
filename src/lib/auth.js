module.exports = {

    isLoggedIn(req, res, next){
        if(req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },


 
isNoLoggedIn(req, res, next){
    if(!req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/profile'); //si el usiario si esta identificado 
},

};