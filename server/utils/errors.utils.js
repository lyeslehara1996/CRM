const UserModel=require('../models/user.model');
module.exports.signUpErrors = (err) => {

    let errors = {firstname:"",lastname:"" ,pseudo: "", email: ""}
   
    // if (req.body.pseudo  === null || req.body.pseudo === '' || req.body.password === null || req.body.password === '' || req.body.email === null || req.body.email === '' || req.body.firstname === null || req.body.firstname === ''|| req.body.lastname === null || req.body.lastname === '') {
    //     res.json({ success: false, message: 'Ensure username, email, and password were provided' });
    // }

    // if (errors.firstname) {
    //     res.json({ success: false, message: errors.firstname.message }); // Display error in validation (name)
    // }
    //  if (errors.lastname) {
    //     res.json({ success: false, message: errors.lastname.message }); // Display error in validation (email)
    // } 
    //  if (errors.email) {
    //     res.json({ success: false, message: errors.email.message }); // Display error in validation (email)
    // } 
    //  if (errors.pseudo ) {
    //     res.json({ success: false, message: errors.pseudo.message }); // Display error in validation (username)
    // }
    //  if (errors.password) {
    //     res.json({ success: false, message: errors.password.message }); // Display error in validation (password)
    // }
    if (err.message.includes('pseudo'))
        errors.pseudo = 'username incorect ou deja pris ';

    if (err.message.includes('email'))
        errors.email = 'Email incorrect';

    if (err.message.includes('password'))
        errors.password = 'le mot de passe doit faire 6 caracteres';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.email = 'ce pseudo est deja pris'

    if (err.code === 11000 && Object.keys(err.keyValues)[0].includes['email'])
        errors.email = 'cet email est deja pris'



    return errors
};

module.exports.signInErrors=(err)=>{
    let errors ={email:"",password:""}
    if(err.message.includes("email"))
        errors.email="email inconnue";

    if(err.message.includes("password"))
        errors.password="password inconnue";
    
    return errors;
};

module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""};
  
    if (err.message.includes('invalid file'))
      errors.format = "Format incompatabile";
  
    if (err.message.includes('max size'))
      errors.maxSize = "Le fichier dépasse 500ko";
  
    return errors
  }