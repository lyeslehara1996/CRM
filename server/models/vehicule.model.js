const mongoose = require('mongoose');
var validate = require('mongoose-validator'); // Import Mongoose Validator Plugin


const VehiculeSchema = new mongoose.Schema(
    {
        model: {
        type: mongoose.SchemaTypes.ObjectId,
		ref: 'Modeles',
		required: true,
        },
    descriptions_Modeles: {
            type: String,
             required:true,
        },
        AnneeDeProduction: {
            type: Date,
             required:true,
        }
    },
    {
        timestamps: true,
    }

)

const Vehicule= mongoose.model('Vehicule', VehiculeSchema);
module.exports = Vehicule;