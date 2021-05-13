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
    condition: {
        type: String, 
    },
    image: {
        type: String,
    },
    netPrice: {
        type: String,
    },
    amountOfTax: {
        type: String,
    },
    grandTotal: {
        type: String,
    },
    dateAddition: {
        type: String,
    },
    availableQuantity: {
        type: String,
    },
    quantitySold: {
        type: String,
    },
});

const piece = mongoose.model('piece', pieceSchema);
module.exports = piece;
