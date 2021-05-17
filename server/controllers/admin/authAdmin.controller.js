const UserModel=require('../../models/user.model');
const jwt = require('jsonwebtoken');
const fs=require('fs')
const { signUpErrors } = require('../../utils/errors.utils');
const {signInErrors} = require('../../utils/errors.utils'); 

//tocken jwt 
//maxAge c'est pour la duree du tocken qui va cree 
const maxAge = 5 *24*60*60*1000;
const createToken = (id) =>{

    return jwt.sign({id},process.env.TOKEN_SUCRETS,{
        expiresIn:maxAge
    })
};

module.exports.loginAdmin = async(req, res)=>{

    const {email,password}=req.body;
   UserModel.findOne({email}).exec((error,user)=>{
    if(user){
        if(user.roles==='admin'){
            const admin = UserModel.login(email,password);
            const token=createToken(admin._id);
            res.cookie('jwt',token, {httpOnly:true, maxAge});
            res.status(200).json({ admin:user._id});
        }else{
            res.status(400).json({error:"tu es pas un admin "})
        }

    }else{
        res.status(400).json({error:"vous n'etes pas inscris "})
    }
   });

}
module.exports.logoutAdmin=async(req, res)=>{
    res.cookie('jwt', '',{maxAge: 1});
    res.status(200).redirect('/');
}
module.exports.signupAdmin= async(req, res)=>{
    const{firstname,lastname,pseudo,email , password, bio,telephone ,address,ville}=req.body
    const picture = req.file.originalname
    const newadmin = new UserModel({
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
        roles:'admin'
    });
    try{
        const admin = await newadmin.save();
        return res.status(201).json(admin);
    }catch(err){
        res.status(400).send(err);
    }
}