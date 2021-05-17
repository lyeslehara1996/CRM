const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors } = require('../utils/errors.utils');
const { signInErrors } = require('../utils/errors.utils');
var secret = 'harrypotter'; // Create custom secret for use in JWT
var nodemailer = require('nodemailer'); // Import Nodemailer Package
const _ = require('lodash')
const { findById } = require('../models/user.model');
//tocken jwt 
//maxAge c'est pour la duree du tocken qui va cree 
const maxAge = 5 * 24 * 60 * 60 * 1000;
const createToken = (id) => {s

    return jwt.sign({ id }, process.env.TOKEN_SUCRETS, {
        expiresIn: maxAge
    })
};




// Nodemailer options (use with g-mail or SMTP)
var smtpConfig = {
    service: "Gmail",
    auth: {
        user: 'lyeslehara77@gmail.com',
        pass: 'lyeslehara1996'
    }
};
var client = nodemailer.createTransport(smtpConfig);

module.exports.signup = async(req,res)=>{
    console.log(req.body)
const {firstname,lastname,pseudo,email,password}=req.body

try{
    const user=await UserModel.create({firstname,lastname,pseudo,email,password});
    res.status(200).json({user: user._id});
    console.log(user)
}
catch(err){
    const errors =signUpErrors(err);
    res.status(201).send({ errors});
}
}
module.exports.activerCompte = async (req, res) => {

    const { token } = req.body;
    if (token) {
        jwt.verify(token, secret, function (err, decodedToken) {
            if (err) return res.status(400).json({ err: 'votre token est invalide !' });

            const { firstname, lastename, pseudo, email, password } = decodedToken;
            UserModel.findOne({ email }).exec((err, user) => {
                if (user) {
                    res.status(400).json({ error: "utilisateur existe deja " })
                }
                let newUser = new UserModel({ firstname, lastename, pseudo, email, password });
                newUser.save((err, success) => {
                    if (err) {
                        console.log("error in signup: " + err);
                        return res.status(400).json({ error: err });
                    } else {
                        res.status(200).json({ message: "signup success  ", success })
                    }
                })
            });
        })

    } else {
        return res.status(400).json({ err: 'error!' })
    }
}

module.exports.signin = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user._id });

    } catch (err) {

        const errors = signInErrors(err);
        res.status(200).json(errors);
    }
}



module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).redirect('/');
}



module.exports.forgotpassword = async (req, res) => {
    const { email } = req.body;

    UserModel.findOne({ email }, (err, user) => {
        if (!user) {
            return res.status(400).json({ error: "user avec cette email existe pas " })
        }
        console.log(user);
        const PasswordRestToken = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '5min' }); // Create a token for activating account through e-mail
        var emailPassword = {
            from: 'lyeslehara77@gmail.com',
            to: req.body.email,
            subject: 'Your Password Reset Link',
            text: 'Hello ' + req.body.firstname,
            html: `
                   <h2> Please click on given link to reset your password </h2> </br> </br>
                   <p> http://localhost:5000/api/user/resetPassword/${PasswordRestToken}</p>

                   `
        };

        return UserModel.updateOne({ resetLink: PasswordRestToken }, (err, success) => {
            console.log(success);

            client.sendMail(emailPassword, function (err, info) {
                if (err) {
                    console.log(err); // If error with sending e-mail, log to console/terminal
                    console.log(emailPassword)
                } else {
                    console.log(info); // Log success message to console if sent
                }
                res.json({ success: true, message: 'votre compte est cee avec succes confermer votre email please !' }); // Send success message back to controller/request

                res.status(200).redirect("/login");
            });

        })



    });
}

module.exports.resetpassword = async (res, req) => {

    const { newpassword } = req.body;
    if (resetLink) {
        jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function (err, decodedToken) {
            if (err) return res.status(400).json({ err: 'votre token est invalide !' });
            UserModel.findOne({ resetLink }).exec((err, user) => {
                if (err || !user) return res.status(400).json({ err: "Utilisateur n'existe pas  avec ce token " })
                console.log(user);
                const { _id } = decodedToken;

            })
        })
    } else {
        return res.status(400).json({ error: "token n'existe pas " });
    }

}