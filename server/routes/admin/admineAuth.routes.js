const router = require('express').Router();
const authController=require('../../controllers/admin/authAdmin.controller')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: './uploads/adminUploads/profileUploads',
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({
	storage: storage,
});
//auth
router.post('/register',upload.single('image'), authController.signupAdmin);
router.post('/login', authController.loginAdmin);
router.post('/logout', authController.logoutAdmin);
module.exports=router;