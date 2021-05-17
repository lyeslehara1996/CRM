const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
var validate = require('mongoose-validator'); // Import Mongoose Validator Plugin

// // User Name Validator
 var firstnameValidator = [
    validate({
        validator: 'matches',
        arguments: /^(([a-zA-Z]{3,20}))+$/,
        message: 'firstname must be at least 3 characters, max 30, no special characters or numbers, must have space in between name.'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 30],
        message: 'firstname should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];
var lastnameVAlidator = [
    validate({
        validator: 'matches',
        arguments: /^(([a-zA-Z]{3,30}))+$/,
        message: 'lastename must be at least 3 characters, max 30, no special characters or numbers, must have space in between name.'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 30],
        message: 'lastename should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

// User E-mail Validator
var emailValidator = [
    validate({
        validator: 'matches',
        arguments: /^(([a-zA-Z0-9._-]{3,})+@+([a-z]{2,10})+.+(org|fr|dz))+$/,
        message: 'email must be at least 3 characters, must have space in between name, containe org dz or fr.'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

// Username Validator
var pseudoValidator = [
    validate({
        validator: 'matches',
        arguments: /^(([a-zA-Z0-9]{5,30})|([a-zA-Z]{5,30}))+$/,
        message: 'pseudo should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'pseudo must contain letters and numbers only'
    })
];

// Password Validator
var passwordValidator = [
    validate({
        validator: 'matches',
        arguments: /^((([a-z]){3,20}([0-9]){3,10})([!@#\$%\^&\*]){2,5}|([a-zA-Z0-9]){3,30})$/,
        message: 'Password needs to have at least three lower case, at least  three number, at between of 2-5 of special character,or  least 3 characters alphanumirique  but no more than 35.'
    }),
    validate({
        validator: 'isLength',
        arguments: [6, 35],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];
var PhoneNumberValidator = [
    validate({
        validator: 'matches',
        arguments: /^[+]?[1-9]{9}|[0]+[1-9]{9}$/,
        message: 'Password needs to have at least three lower case, at least  three number, at between of 2-5 of special character,or  least 3 characters alphanumirique  but no more than 35.'
    }),
    validate({
        validator: 'isLength',
        arguments: [6, 35],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
            trim: true,
          validate: firstnameValidator
        },
        lastname: {
            type: String,
             required:true,
            minlength: 3,
            maxlength: 30,
            trim: true,
             validate:lastnameVAlidator 

        },
        pseudo: {
            type: String,
            required:true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true,
             validate: pseudoValidator
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
            validate:emailValidator
        },
        password: {
            type: String,
            required: true,
            maxlength: 30,
            minlength: 3,
            validate:passwordValidator
        },
        roles: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },
        picture: {
            type: String,
            default: "./uploas/profil/random-user.png"
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
            validate:PhoneNumberValidator

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
//plaay function before save cryptage de mot de passe 
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//login condition to compare password 
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    console.log(user);
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("mot de passe incorrect")
    }
    throw Error(" email incorrect")

};

userSchema.methods = {

    authenticate: function (password) {
        return bcrypt.compareSync(password, this.password)
    }
}

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;