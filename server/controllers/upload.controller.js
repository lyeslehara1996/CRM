const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const { uploadErrors } = require('../utils/errors.utils');
const fs=require('fs')
const {promisify }= require('util')
const pipeline= promisify(require('stream').pipeline);
const path = require('path');
//get all users 
module.exports.upload =  (req, res,next) => {
  const { img } = req.body;

	res.sendFile(path.join(__dirname, `./uploads/${img}`));
}