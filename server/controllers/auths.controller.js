const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken')
//maxAge c'est pour la duree du tocken qui va cree 
const maxAge = 5 * 24 * 60 * 60 * 1000;
const createToken = (id) => {s

    return jwt.sign({ id }, process.env.TOKEN_SUCRETS, {
        expiresIn: maxAge
    })
};


module.exports.signin = async(req, res)=>{

    const {email,password}=req.body;
   UserModel.findOne({email}).exec((error,user)=>{
    if(user){
        if(user.roles==='user'){
            const user = UserModel.login(email,password);
            const token=createToken(user._id);
            res.cookie('jwt',token, {httpOnly:true, maxAge});
            res.status(200).json({ user:user._id});
        }else{
            res.status(400).json({error:"erreur d'authentification "})
        }

    }else{
        res.status(400).json({error:"vous n'etes pas inscris "})
    }
   });

}

module.exports.logout=async(req, res)=>{
    res.cookie('jwt', '',{maxAge: 1});
    res.status(200).redirect('/');
}


module.exports.signup= async(req, res)=>{
    const{firstname,lastname,pseudo,email , password, bio,telephone ,address,ville}=req.body
    const picture = req.file.originalname
    const newUser = new UserModel({
        firstname,
        lastname,
        pseudo,
        email,
        password,
        bio,
        telephone,
        address,
        ville,
        picture,
        roles:'user'
    });
    try{
        const user = await newUser.save();
        return res.status(201).json(user);
    }catch(err){
        res.status(400).send(err);
    }
}