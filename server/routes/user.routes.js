const router = require('express').Router();
const ClientpanierController = require('../controllers/Clientpanier.controller')
const userAuthController = require('../controllers/userAuth.controller')
const authController = require('../controllers/auth.controller')
//const userController = require('../controllers/user.controller')
const { checkUser, requireAuth, requiredCompte } = require('../middleware/auth.middlware')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: './uploads',
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({
	storage: storage,
});
//auth
router.post('/register',upload.single('img'), userAuthController.signup);
router.post('/login', userAuthController.signin);
router.get('/logout', userAuthController.logout);

// router.post('/register',authController.signup);
// router.post('/login', authController.signin);
// router.get('/logout', authController.logout);
// router.post('/activationCompte', requiredCompte, authController.activerCompte);
// router.put('/password/forgotPassword', authController.forgotpassword);
// router.put('/password/resetPassword/', authController.resetpassword);
//user DATABASE 
router.post('/ajoutPanier',ClientpanierController.addPanier);
router.post('/getPanier',ClientpanierController.getPanier);
router.delete('/suppPanier', ClientpanierController.deletePanier);

module.exports = router;