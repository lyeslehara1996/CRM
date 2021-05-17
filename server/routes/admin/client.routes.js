const router = require('express').Router();
const clientController = require('../../controllers/admin/client.controller')

//clientController
router.post('/client',clientController.addclient)
router.get('/client',clientController.getAllclient);
router.get('/client/:id',clientController.client);
router.put('/client/:id',clientController.updatclient);
router.delete('/client/:id',clientController.deletclient);


module.exports = router;