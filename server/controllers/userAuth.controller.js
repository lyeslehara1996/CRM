const UserModel=require('../models/user.model');
const Client=require('../models/Client.model');
const jwt = require('jsonwebtoken');
const { signUpErrors } = require('../utils/errors.utils');
const {signInErrors} = require('../utils/errors.utils'); 
const maxAge = 5 *24*60*60*1000;
const createToken = (id) =>{

    return jwt.sign({id},process.env.TOKEN_SUCRETS,{
        expiresIn:maxAge
    })
};

module.exports.signup= async(req,res)=>{
    const{firstname,lastname,pseudo,email , password, bio,telephone ,address,ville}=req.body
    const picture = req.file.originalname;
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
        picture
    });
    const newclient = new Client(newUser)
    try{
        const User = await newUser.save();
       const client=await newclient.save()
        return res.status(201).json(client);
    }catch(err){
        res.status(400).send(err);
    }

}

module.exports.signin= async(req,res)=>{
    const {email,password}=req.body;
   Client.findOne(email).exec((error,user)=>{
       console.log(user)
    if(user){
        if(user.roles==='user'){
            const client = UserModel.login(email,password);
            const token=createToken(client._id);
            res.cookie('jwt',token, {httpOnly:true, maxAge});
            res.status(200).json({ client:user._id});
        }else{
            res.status(400).json({error:"tu es pas un admin "})
        }

    }else{
        res.status(400).json({error:"vous n'etes pas inscris "})
    }
   });

}


module.exports.logout= async(req,res)=>{
    res.cookie('jwt', '',{maxAge: 1});
    res.status(200).redirect('/');
}