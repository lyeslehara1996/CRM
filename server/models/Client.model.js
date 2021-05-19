const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
var validate = require('mongoose-validator'); // Import Mongoose Validator Plugin
const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
            trim: true,
        
        },
        lastname: {
            type: String,
             required:true,
            minlength: 3,
            maxlength: 30,
            trim: true,
           

        },
        pseudo: {
            type: String,
            required:true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true,
            
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
            
        },
        password: {
            type: String,
            required: true,
            maxlength: 30,
            minlength: 3,
          
        },
        roles: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },
        picture: {
            type: String,
            default: "./uploads/profil/random-user.png"
        },
        bio: {
            type: String,
            max: 1024,
            default:''
        },
        telephone: {
            type: String,
            required: true,
            maxlength: 10,
          

        },
        address: {
            type: String,
            default:''
        },
        ville: {
            type: String,
            default:''
        },
        resetLink: {
            type: String,
            default: ''
        },
        active: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true,
    }

)

const Client = mongoose.model('Client', userSchema);
module.exports = Client;