const express = require("express");
const Usershema = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registervalidation, validation } = require("../middleware/Validation");
const isAuth = require("../middleware/isAuth");

const authRoute = express.Router();
authRoute.post("/signUp", registervalidation, validation ,async (req, res) => {
  const { email, password, username, name } = req.body;

  try {
    const user = new Usershema({...req.body});
    const found = await Usershema.findOne({ email });
    const foundusername = await Usershema.findOne({ username });
    if (foundusername) {
      return res.status(400).send({ msg: "username alredy exist" });
    }
    if (found) {
      return res.status(400).send({ msg: "user alredy exist" });
    }
  
    const salt = 15;
    const hashpassword = bcrypt.hashSync(password, salt);
    user.password = hashpassword;

    const payload = { _id: user._id };
    const token = jwt.sign(payload, process.env.secretocken);

    await user.save();
    res.status(200).send({ msg: "register sucsses", user, token });
  } catch (error) {
    res.status(500).send({
      error: [{ msg: "could not register" ,error}],
    });
  }
});

authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usershema.findOne({ email });
    

    if  (!user) {
      return res.status(400).send({ error: [{ msg: "bad email" }] });
    }
    

    const match =  bcrypt.compareSync(password, user.password);

    if (!match) {
      return res.status(400).send({ error: [{ msg: "bad password" }] });
    }
    const payload = { _id: user._id };
    const token =  jwt.sign(payload, process.env.secretocken);

    res.status(200).send({ msg: "login sacsees", user ,token});
  } catch (error) {
    res.status(500).send({ error: [{ msg: "could not login" }] });
  }

 

  
});
authRoute.get("/me", isAuth ,(req,res)=> res.send(req.user))

module.exports = authRoute;
