const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const { uploadErrors } = require('../utils/errors.utils');
const fs=require('fs')
const {promisify }= require('util')
const pipeline= promisify(require('stream').pipeline);

//get all users 
module.exports.upload = async (req, res,next) => {
    try {
        if (
          req.file.detectedMimeType !== "image/jpg" &&
          req.file.detectedMimeType !== "image/png" &&
          req.file.detectedMimeType !== "image/jpeg"
        )
          throw Error("invalid file");
    
        if (req.file.size > 50000000000000) throw Error("max size");
      } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
      }

      const fileName = req.body.name + ".*";

      await pipeline(
        req.file.stream,
        fs.createWriteStream(
          `${__dirname}/../uploads/client/${fileName}`
        )
      );
}