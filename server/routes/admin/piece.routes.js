const router = require('express').Router();
 const pieceController=require('../../controllers/admin/piece.controller')
//uploads
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/adminUploads/pieceUploads',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(new Error(msg),false);
    }else{

        cb(null,false)
    }
}
const upload = multer({
    storage: storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
});


router.post('/addpiece',upload.single('image'), pieceController.addpiece);
router.get('/getpiece/', pieceController.getallpiece);
router.get('/getpiece/:id', pieceController.getpiece);
router.put('/updatepiece/:id', pieceController.updatepiece);
router.delete('/deletepiece/:id', pieceController.deletepiece);

module.exports = router;