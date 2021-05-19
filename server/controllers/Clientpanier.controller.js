const Panier = require('../models/panier');
const Client = require('../models/Client.model');
//add panier 
module.exports.addPanier = async (req, res) => {
const {user} = req.body;
let client = await Client.findOne({
    client: user,
});
console.log(client)
if(!client){
    res.status(500).json({ msg: "tu es un admin vous n'avez pas le driot de crier un panier  " });
}else{
    const panier = new Panier({
        client:client
    });
    try{
        const newpanier = await panier.save();
        return res.status(201).json(newpanier);
    }catch(err){
        console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
    }
}

        

}
//get user selon son id 
module.exports.getPanier = async (req, res) => {
   
};
//delete panier
module.exports.deletePanier = async (req, res) => {
  
};

