const mongoose = require('mongoose');
var validate = require('mongoose-validator'); // Import Mongoose Validator Plugin


const PanierSchema = new mongoose.Schema(
    {
        client: {
        type: mongoose.SchemaTypes.ObjectId,
		ref: 'Client',
		required: true,
        }
    },
    {
        timestamps: true,
    }

)

const Panier = mongoose.model('panier', PanierSchema);
module.exports = Panier;