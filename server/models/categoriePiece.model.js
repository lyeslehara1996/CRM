const mongoose = require('mongoose');
var validate = require('mongoose-validator'); // Import Mongoose Validator Plugin


const categoiePieceSchema = new mongoose.Schema(
    {
        categorie: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }

)

const categoiePiece = mongoose.model('categoiePiece', categoiePieceSchema);
module.exports = categoiePiece;