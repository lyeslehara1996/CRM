const router = require('express').Router();
const modelesController=require('../../controllers/admin/modeles.controller')
 const vehiculeController=require('../../controllers/admin/vehicules.controller')
 const pieceController=require('../../controllers/admin/piece.controller')
 const categoriePiece=require('../../controllers/admin/categoriePiece.controller')


//ModelsRoutes
router.post('/modeles', modelesController.addmodeles);
router.get('/modeles/', modelesController.getallmodeles);
router.get('/modeles/:id', modelesController.getmodeles);
router.put('/modeles/:id', modelesController.updatemodeles);
router.delete('/modeles/:id', modelesController.deletemodeles);

//VehiculesRoutes

router.post('/vehicule', vehiculeController.addvehicule);
router.get('/vehicule/', vehiculeController.getallvehicule);
router.get('/vehicule/:id', vehiculeController.getvehicule);
router.put('/vehicule/:id', vehiculeController.updatevehicule);
router.delete('/vehicule/:id', vehiculeController.deletevehicule);

// //PiecesRoutes

router.post('/piece', pieceController.addpiece);
router.get('/piece/', pieceController.getallpiece);
router.get('/piece/:id', pieceController.getpiece);
router.put('/piece/:id', pieceController.updatepiece);
router.delete('/piece/:id', pieceController.deletepiece);

//categoriePiece
router.post('/categoriePiece', categoriePiece.addCategoriePiece);
router.get('/categoriePiece', categoriePiece.getallCategoriePiece);

module.exports = router;