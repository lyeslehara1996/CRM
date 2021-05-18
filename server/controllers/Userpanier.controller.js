const Panier = require('../models/panier');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

//add panier 
module.exports.addPanier = async (req, res) => {
    const idUser = req.params.id;
    if (!ObjectID.isValid(idUser))
        return res.status(400).send('ID unknown :' + idUser);
        let User = await UserModel.findOne({ _id: idUser });
        if (!User)
            return res.status(500).json({
                error: errMsg,
            });
            try {
                Panier = new Panier({
                    User,
                });
        
                await Panier.save();
                res.send('Panier saved');
            } catch (err) {
                console.error(err.message);
                res.status(500).json({ msg: 'Server Error' });
            }
        

}
//get user selon son id 
module.exports.getPanier = async (req, res) => {
   
};
//delete panier
module.exports.deletePanier = async (req, res) => {
  
};

