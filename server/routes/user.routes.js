const router = require('express').Router();
const authsController = require('../controllers/auths.controller')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const uploadController = require('../controllers/upload.controller')
const { checkUser, requireAuth, requiredCompte } = require('../middleware/auth.middlware')
const multer=require('multer')
const upload = multer()
//auth
router.post('/registers', authsController.signup);
router.post('/logins', authsController.signin);
router.get('/logouts', authsController.logout);

router.post('/register',upload.single('image'),authController.signup);
router.post('/login', authController.signin);
router.get('/logout', authController.logout);
router.post('/activationCompte', requiredCompte, authController.activerCompte);
router.put('/password/forgotPassword', authController.forgotpassword);
router.put('/password/resetPassword/', authController.resetpassword);
//user DATABASE 
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

//upload files
router.post('/upload',upload.single('image'),uploadController.upload);
module.exports = router;