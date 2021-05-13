const Modeles = require('../../models/Modeles.model');
const ObjectID = require('mongoose').Types.ObjectId;
const { validationResult } = require('express-validator');

//addModeles
module.exports.addmodeles = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "there is no request" });
    }

    const { model, motorisation } = req.body;
    try {
        let Models = await Modeles.findOne({
            model: model
        });
        


        Models = new Modeles({
            model,
            motorisation
        });

        await Models.save();
        res.send('Models saved');

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: errMsg });
    }
}
//GetAllModeles
module.exports.getallmodeles = async (req, res) => {

    try {
        let models = await Modeles.find();
        if (!models) return res.status(500).json({ error: errMsg });
        res.json(models);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: errMsg });
    }

}


//getOneModeles
module.exports.getmodeles = async (req, res) => {
    const idModels = req.params.id;
    if (!ObjectID.isValid(idModels))
        return res.status(400).send('ID unknown :' + idModels);

    try {
        let models = await Modeles.findOne({ _id: idModels });
        if (!models)
            return res.status(500).json({
                error: errMsg,
            });
        res.json(models);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: errMsg });
    }
}



//UpdateModels
module.exports.updatemodeles = async (req, res) => {
    const idModels = req.params.id;
    if (!ObjectID.isValid(idModels))
        return res.status(400).send('ID unknown :' + idModels);
    try {
        await Modeles.findByIdAndUpdate(
            { _id: idModels },
            {
                $set: {
                    model:req.body.model,
                     motorisation:req.body.motorisation
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }

}

//deleteModeles
module.exports.deletemodeles = async (req, res) => {
    const idModels = req.params.id;
    if (!ObjectID.isValid(idModels))
        return res.status(400).send('ID unknown :' + idModels);
try {
    await Modeles.remove({ _id:idModels }).exec();
    res.status(200).json({ message: "success deleted " });
} catch (err) {
    res.status(200).json({ message: err })
}

}