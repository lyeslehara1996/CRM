const { times } = require('lodash');
const mongoose = require('mongoose');
var validate = require('mongoose-validator'); // Import Mongoose Validator Plugin

var pieceSchema = new mongoose.Schema({
    reference: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true, 
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
		ref: 'categoiePiece',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    etat: {
        type: String, 
    },
    image: {
        type: String,
    },
    tva: {
        type: Number,
    },
    prix_ht: {
        type: Number,
    },
    prix_ttc: {
        type: Number,
    },
    dateAjout: {
        type: Date,
        default:Date.now()
    },
    quantite_disp: {
        type: Number,
    },
    quantite_vendu: {
        type: Number,
    },
});

const piece = mongoose.model('piece', pieceSchema);
module.exports = piece;
