const express = require("express");
const {
  addmedication,
  getall,
  deletemedication,
  updatemedication,
  getonebyid,
} = require("../controllers/controllers");
const isAuth = require("../middleware/isAuth");
const MedicationRoute = express.Router();

MedicationRoute.post("/addmedication", isAuth, addmedication);
MedicationRoute.get("/", getall);
MedicationRoute.delete("/deletemedication/:id", isAuth, deletemedication);
MedicationRoute.put("/updatemedication/:id", isAuth, updatemedication);
MedicationRoute.get("/:id", getonebyid);
module.exports = MedicationRoute;
