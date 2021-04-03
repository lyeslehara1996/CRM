const CategoriePiece = require('../../models/categoriePiece.model');
const ObjectID = require('mongoose').Types.ObjectId;
const { validationResult } = require('express-validator');


module.exports.addCategoriePiece = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "there is no request" });
    }

    const { categorie } = req.body;
    try {
        let categoriePieces = await Modeles.findOne({
            categorie: categorie
        });
        


        categoriePieces = new CategoriePiece({
            categorie
        });

        await CategoriePiece.save();
        res.send('Categorie saved');

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Erreur" });
    }

}
module.exports.getallCategoriePiece = async (req, res) => {
    try {
        let categoriePieces = await CategoriePiece.find();
        if (!categoriePieces) return res.status(500).json({ error: "Categorie not find" });
        res.json(categoriePieces);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: errMsg });
    }

}