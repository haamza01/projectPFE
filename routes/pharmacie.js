const express = require("express");
const PharmacieRoute = express.Router();
const Usershema = require("../models/auth");
const isAuth = require("../middleware/isAuth");
const {
  PharmacieDelete,
  updatepharmacie,
  getonepharmacie,
  getallpharmacie,
} = require("../controllers/controllers");

PharmacieRoute.get("/all", getallpharmacie);
PharmacieRoute.delete("/:id", isAuth, PharmacieDelete);
PharmacieRoute.put("/:id", isAuth, updatepharmacie);
PharmacieRoute.get("/:id", isAuth, getonepharmacie);

module.exports = PharmacieRoute;
