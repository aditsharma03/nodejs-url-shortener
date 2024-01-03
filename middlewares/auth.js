const { getUser } = require("../service/auth");

function restrictToLoggedInUsersOnly( req, res, next ){

    const userUid = req.cookies?.uid;
    if( !userUid ) res.redirect("/login");
    
    const user = getUser(userUid);
    if( !user ) res.redirect("/login");

    req.user = user;

    next();

}

function checkAuth( req, res, next ){

    const userUid = req.cookies?.uid;
    
    const user = getUser(userUid);

    req.user = user;

    next();

}



module.exports = {
    restrictToLoggedInUsersOnly,
    checkAuth,

}