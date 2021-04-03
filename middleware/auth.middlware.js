const jwt =require('jsonwebtoken');
const UserModel = require('../models/user.model');
var secret = 'harrypotter';

module.exports.checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token,process.env.TOKEN_SUCRETS,async(err,decodedToken)=>{
            if(err) {
                res.locals.user =null;
                res.cookie('jwt','',{maxAge:1});
                next();
            }else{

                let user=await UserModel.findById(decodedToken.id);
                res.locals.user=user;
           
                next();
            }
        });
    }else{
        res.locals.user=null;
        next();
    }
}

module.exports.requireAuth = (req,res,next) => {
const token = req.cookies.jwt;
if(token){
    jwt.verify(token,process.env.TOKEN_SUCRETS,async(err,decodedToken)=>{
        if(err){
            console.log(err);
            res.send(200).json('no token ');
        }else{
            console.log(decodedToken.id);
            next();
        }
    });
}else{

    console.log("ma token ");
    res.cookie('jwt', '',{maxAge: 1});
    res.status(200).redirect('/');
}
};

module.exports.requiredCompte=(req,res,next)=>{
    var token = req.body.token || req.body.query || req.headers['x-access-token']; // Check for token in body, URL, or headers

    // Check if token is valid and not expired  
    if (token) {
        // Function to verify token
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.json({ success: false, message: 'Token invalid' }); // Token has expired or is invalid
            } else {
                req.decoded = decoded; // Assign to req. variable to be able to use it in next() route ('/me' route)
                next(); // Required to leave middleware
            }
        });
    } else {
        res.json({ success: false, message: 'No token provided' }); // Return error if no token was provided in the request
    }
}