const UserModel=require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors } = require('../utils/errors.utils');
const {signInErrors} = require('../utils/errors.utils'); 
var secret = 'harrypotter'; // Create custom secret for use in JWT
var nodemailer = require('nodemailer'); // Import Nodemailer Package
const { findById } = require('../models/user.model');
//tocken jwt 
//maxAge c'est pour la duree du tocken qui va cree 
const maxAge = 5 *24*60*60*1000;
const createToken = (id) =>{

    return jwt.sign({id},process.env.TOKEN_SUCRETS,{
        expiresIn:maxAge
    })
};

const createTokenEmail = (id) =>{

    return jwt.sign({id},process.env.TOKEN_EMAIL_VALIDATION,{
        expiresIn:maxAge
    })
};


  // Nodemailer options (use with g-mail or SMTP)
  var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'lyeslehara77@gmail.com',
        pass: 'lyeslehara1996'
    }
};
var client = nodemailer.createTransport(smtpConfig);



module.exports.signup = async(req,res)=>{

       var user = new UserModel(); // Create new User object
       user.firstname = req.body.firstname;
       user.lastname = req.body.lastname;
       user.email = req.body.email; // Save email from request to User object
       user.password = req.body.password; // Save password from request to User object
       user.pseudo  = req.body.pseudo ; // Save username from request to User object
       user.temporarytoken = jwt.sign({  email: user.email,password:user.password }, secret, { expiresIn: '24h' }); // Create a token for activating account through e-mail

        // Check if request is valid and not empty or null
        if (req.body.pseudo  === null || req.body.pseudo === '' || req.body.password === null || req.body.password === '' || req.body.email === null || req.body.email === '' || req.body.firstname === null || req.body.firstname === ''|| req.body.lastname === null || req.body.lastname === '') {
            res.json({ success: false, message: 'Ensure username, email, and password were provided' });
        } else {
            // Save new user to database
            user.save(function(err) {
                if (err) {
                    // Check if any validation errors exists (from user model)
                    if (err.errors !== null) {
                        if (err.errors.firstname) {
                            res.json({ success: false, message: err.errors.firstname.message }); // Display error in validation (name)
                        }else if (err.errors.lastname) {
                            res.json({ success: false, message: err.errors.lastname.message }); // Display error in validation (email)
                        } else if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message }); // Display error in validation (email)
                        } else if (err.errors.pseudo ) {
                            res.json({ success: false, message: err.errors.pseudo.message }); // Display error in validation (username)
                        } else if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message }); // Display error in validation (password)
                        } else {
                            res.json({ success: false, message: err }); // Display any other errors with validation
                        }
                    } else if (err) {
                        // Check if duplication error exists
                        if (err.code == 11000) {
                            if (err.errmsg[61] == "u") {
                                res.json({ success: false, message: 'That username is already taken' }); // Display error if username already taken
                            } else if (err.errmsg[61] == "e") {
                                res.json({ success: false, message: 'That e-mail is already taken' }); // Display error if e-mail already taken
                            }
                        } else {
                            res.json({ success: false, message: err }); // Display any other error
                        }
                    }
                } else {
                    // Create e-mail object to send to user
                    var email = {
                        from: 'lyeslehara77@gmail.com',
                        to: user.email,
                        subject: 'Your Activation Link',
                        text: 'Hello ' + user.firstname,
                        html: `
                               <h2> Hello  ${user.firstname}   clik in this email and confirm your account </h2> </br> </br>
                               <p> http://localhost:5000/api/user/activationCompte/${user.temporarytoken}</p>

                               `
                    };
                    console.log(user.email)
                    // Function to send e-mail to the user
                    client.sendMail(email, function(err, info) {
                        if (err) {
                            console.log(err); // If error with sending e-mail, log to console/terminal
                        } else {
                            console.log(info); // Log success message to console if sent
                            console.log(user.email); // Display e-mail that it was sent to
                            console.log(user.temporarytoken)
                        }
                    });
                    res.json({ success: true, message: 'votre compte est cee avec succes confermer votre email please !' }); // Send success message back to controller/request
                }
            });
        }
}

module.exports.activerCompte=async(req,res)=>
{
    
    const token = req.body;
    if(token){
        jwt.verify(token,process.env.TOKEN_EMAIL_VALIDATION,function(err,decodedToken){
            if(err){
                return res.status(400).json({err:'votre token est invalide !'})
            }
            const {firstname,lastename,pseudo,email,password } = decodedToken;
            UserModel.findOne({email}).exec((err,user)=>{
                if(!user){
                    res.status(400).json({error:"utilisateur existe deja "})
                }
                let newUser=new UserModel({firstname,lastename,pseudo,email,password });
                newUser.save((err,success)=>{
                    if(err){
                        console.log("error in signup: "+err);
                        return res.status(400).json({error: err});
                    }
                    res.status(200).json({message:"signup success  "})
                })
            });
        })
    }else{
        return res.status(400).json({err:'error!'})
    }
}

module.exports.signin = async(req, res)=>{

    const {email,password}=req.body;
    try{
        const user = await UserModel.login(email,password);
        const token=createToken(user._id);
        res.cookie('jwt',token, {httpOnly:true, maxAge});
        res.status(200).json({user: user._id});
        
    }catch(err){

        const errors= signInErrors(err);
        res.status(200).json(errors);
    }
}



module.exports.logout=async(req, res)=>{
    res.cookie('jwt', '',{maxAge: 1});
    res.status(200).redirect('/');
}


