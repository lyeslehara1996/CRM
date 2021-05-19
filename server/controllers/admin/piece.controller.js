const Piece = require('../../models/piece.model');
const ObjectID = require('mongoose').Types.ObjectId;
const { validationResult } = require('express-validator');


module.exports.addpiece = async (req, res) => {
  
  
    const{reference,description ,category , etat,type , tva ,prix_ht ,dateAjout ,quantite_disp,quantite_vendu }=req.body
    const prix_ttc = prix_ht * (1 + tva);
    const image = req.file.originalname
  
  
    const piece = new Piece({
        reference,
        description,
        category,
        type,
        etat,
        image,
        tva,
        prix_ht,
        prix_ttc,
        dateAjout,
        quantite_disp,
        quantite_vendu,
    });
    try{
        const newpiece = await piece.save();
        return res.status(201).json(newpiece);
    }catch(err){
        res.status(400).send(err);
    }

}
module.exports.getallpiece = async (req, res) => {
 
   
	try {
		let piece = await Piece.find()
			.populate({
				path: 'category',
				model: 'categoiePiece',
				select: 'categorie -_id',
			});
		if (!piece)
			return res.status(500).json({
				error: "Something happened, couldn't process query",
			});
		res.json(piece);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: errMsg });
	}

}

module.exports.getpiece = async (req, res) => {
    const idpiece = req.params.id;
	if (!ObjectID.isValid(idpiece))
		return res.status(400).send('ID inconnue :' + idpiece);
	try {
		let piece = await Piece.findOne({ _id: idpiece })
			.populate({
				path: 'category',
				model: 'categoiePiece',
				select: 'categorie ',
			});
		if (!piece)
			return res.status(500).json({
				error: "aucun piece ",
			});
		res.json(piece);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: "erreur" });
	}

}
module.exports.updatepiece = async (req, res) => {
    const idpiece = req.params.id;
    if (!ObjectID.isValid(idpiece))
    return res.status(400).send('ID inconnue :' + idpiece);

try {
    await Piece.findByIdAndUpdate(
        { _id: idpiece },
        {
            $set: {
                description: req.body.description,
                etat:req.body.etat,
                quantite_disp:req.body.quantite_disp,
                quantite_vendu:req.body.quantite_vendu,
            }
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
            if (!err) return res.send(docs);
            if (err) return res.status(500).send({ message: err });
        }
    )
} catch (err) {
    return res.status(500).json({ message: err });
}

}
module.exports.deletepiece = async (req, res) => {
    const idpiece = req.params.id;
	if (!ObjectID.isValid(idpiece))
		return res.status(400).send('ID unknown :' + idpiece);
	try {
		await Modeles.remove({ _id: idpiece }).exec();
		res.status(200).json({ message: "success deleted " });
	} catch (err) {
		res.status(200).json({ message: err })
	}

}