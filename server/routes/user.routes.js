const router = require('express').Router();
const UserpanierController = require('../controllers/Userpanier.controller')
const authsController = require('../controllers/auths.controller')
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
router.post('/registers',upload.single('img'), authsController.signup);
router.post('/logins', authsController.signin);
router.get('/logouts', authsController.logout);

router.post('/register',authController.signup);
router.post('/login', authController.signin);
router.get('/logout', authController.logout);
router.post('/activationCompte', requiredCompte, authController.activerCompte);
router.put('/password/forgotPassword', authController.forgotpassword);
router.put('/password/resetPassword/', authController.resetpassword);
//user DATABASE 
router.post('/ajoutPanier/:id',UserpanierController.addPanier);
router.post('/getPanier',UserpanierController.getPanier);
router.delete('/suppPanier', UserpanierController.deletePanier);

module.exports = router;