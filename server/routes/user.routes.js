const router = require('express').Router();
const authsController = require('../controllers/auths.controller')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const { checkUser, requireAuth, requiredCompte } = require('../middleware/auth.middlware')
//auth
router.post('/registers', authsController.signup);
router.post('/logins', authsController.signin);
router.get('/logouts', authsController.logout);

router.post('/register', authController.signup);
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

module.exports = router;