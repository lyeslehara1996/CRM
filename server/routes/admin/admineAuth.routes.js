const router = require('express').Router();
const authController=require('../../controllers/admin/authAdmin.controller')

//auth
router.post('/register', authController.signupAdmin);
router.post('/login', authController.loginAdmin);
router.post('/logout', authController.logoutAdmin);
module.exports=router;