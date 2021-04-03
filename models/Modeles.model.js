const mongoose = require('mongoose');
var validate = require('mongoose-validator'); // Import Mongoose Validator Plugin


const ModelesSchema = new mongoose.Schema(
    {
        model: {
            type: String,
            required: true,
        },
        motorisation: {
            type: String,
             required:true,
             enum: ['sans plan', 'diesel', 'gpl', 'super']
        }
    },
    {
        timestamps: true,
    }

)

const Modeles= mongoose.model('Modeles', ModelesSchema);
module.exports = Modeles;