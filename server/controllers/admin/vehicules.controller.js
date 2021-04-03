const Vehicule = require('../../models/vehicule.model');
const ObjectID = require('mongoose').Types.ObjectId;
const { validationResult } = require('express-validator');
const path = require('path');




module.exports.addvehicule = async (req, res) => {
	// Check validation results
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// Get posted data & storing them
	const { model, descriptions, AnneeDeProduction } = req.body;
	try {
		let vehicule = await Vehicule.findOne({
			model: model,
		});

		vehicule = new Vehicule({
			model,
			descriptions,
			AnneeDeProduction,

		});

		await vehicule.save();
		res.send('vehicule saved');
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}

}


module.exports.getallvehicule = async (req, res) => {

	try {
		let vehicule = await Vehicule.find()
			.populate({
				path: 'model',
				model: 'Modeles',
				select: 'motorisation model	',
			});
		if (!vehicule)
			return res.status(500).json({
				error: "Something happened, couldn't process query",
			});
		res.json(vehicule);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: errMsg });
	}


}

module.exports.getvehicule = async (req, res) => {
	const idVehicule = req.params.id;
	if (!ObjectID.isValid(idVehicule))
		return res.status(400).send('ID inconnue :' + idVehicule);
	try {
		let vehicule = await Vehicule.findOne({ _id: idVehicule })
			.populate({
				path: 'model',
				model: 'Modeles',
				select: 'motorisation model ',
			});
		if (!vehicule)
			return res.status(500).json({
				error: "aucun vehicule ",
			});
		res.json(vehicule);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ error: "erreur" });
	}
}

module.exports.updatevehicule = async (req, res) => {
	const idVehicule = req.params.id;
	if (!ObjectID.isValid(idVehicule))
		return res.status(400).send('ID inconnue :' + idVehicule);

	try {
		await Vehicule.findByIdAndUpdate(
			{ _id: idVehicule },
			{
				$set: {
					descriptions: req.body.descriptions,
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
module.exports.deletevehicule = async (req, res) => {
	const idVehicule = req.params.id;
	if (!ObjectID.isValid(idVehicule))
		return res.status(400).send('ID unknown :' + idVehicule);
	try {
		await Modeles.remove({ _id: idVehicule }).exec();
		res.status(200).json({ message: "success deleted " });
	} catch (err) {
		res.status(200).json({ message: err })
	}

}