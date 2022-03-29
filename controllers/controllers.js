const medicationSchema = require("../models/medication");
const Usershema = require("../models/auth");

exports.addmedication = async (req, res) => {
  const { name, description, price, disponible } = req.body;

  try {
    const medication = medicationSchema({
      ...req.body,
      pharmacyId: req.user._id,
    });

    console.log(medication);

    const found = await medicationSchema.findById(medication._id);
    if (found) {
      return res.status(400).send({ msg: "madication alredy exist" });
    }
    console.log(medication);
    await medication.save();
    res.status(200).send({ msg: "medication is added", medication });
  } catch (error) {
    res.status(500).send({ msg: "could not add", error });
  }
};
exports.getall = async (req, res) => {
  try {
    const medication = await medicationSchema.find().populate("pharmacyId");
    res.status(200).send({ msg: "your medication list", medication });
  } catch (error) {
    res.status(500).send({ msg: "could not find medication", error });
  }
};
exports.deletemedication = async (req, res) => {
  try {
    const medicationdelete = await medicationSchema.findByIdAndDelete(
      req.params.id
    );
    res.status(200).send({ msg: "medication deleted", medicationdelete });
  } catch (error) {
    res.status(500).send({ msg: "medication not deleted", error });
  }
};
exports.updatemedication = async (req, res) => {
  try {
    const updatemedication = await medicationSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      }
    );
    res.status(200).send({ msg: "medacation updated", updatemedication });
  } catch (error) {
    res.status(500).send({ msg: "madication not update", error });
  }
};
exports.getonebyid = async (req, res) => {
  try {
    const foundmedication = await medicationSchema.findById(req.params.id);
    res.status(200).send({ msg: "medication found", foundmedication });
  } catch (error) {
    res.status(500).send({ msg: "medication not found", error });
  }
};
// CRUD PHARMACIE
exports.PharmacieDelete = async (req, res) => {
  try {
    const PharmacieDelete = await Usershema.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "pharmacie deleted", PharmacieDelete });
  } catch (error) {
    res.status(500).send({ msg: "pharmacie not deleted", error });
    console.log(error);
  }
};
exports.updatepharmacie = async (req, res) => {
  try {
    const updatePharmacie = await Usershema.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).send({ msg: "Pharmacie updated", updatePharmacie });
  } catch (error) {
    res.status(500).send({ msg: "Pharmacie not update", error });
  }
};
exports.getonepharmacie = async (req, res) => {
  try {
    const foundpharmacie = await Usershema.findById(req.params.id);
    res.status(200).send({ msg: "pharmacie found", foundpharmacie });
  } catch (error) {
    res.status(500).send({ msg: "pharmacie not found", error });
  }
};
exports.getallpharmacie = async (req, res) => {
  try {
    const allpharmacie = await Usershema.find({role:"pharmacie"});
    res.status(200).send({ msg: "your Pharmacie list", allpharmacie });
  } catch (error) {
    res.status(500).send({ msg: "could not find Pharmacie", error });
  }
};
