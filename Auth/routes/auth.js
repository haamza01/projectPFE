const express = require("express");
const Usershema = require("../models/auth");
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')

const authRoute = express.Router();
authRoute.post("/signUp", async (req, res) => {
  const { email, password, username, name } = req.body;

  try {
    const user = new Usershema(req.body);
    const found=await Usershema.findOne({email})
    const foundusername =await Usershema.findOne({username})
    if (foundusername) {return res.status(400).send({msg:'username alredy exist'})  }
    if(found){return res.status(400).send({msg:'email alredy exist'})  }
    const salt=15
    const hashpassword = bcrypt.hashSync(password,salt)
    user.password=hashpassword

    const payload = {_id : user._id}
    const token = jwt.sign(payload,process.env.secretocken)

    await user.save();
    res.status(200).send({msg:'register sucsses', user, token })
  } catch (error) {
      res.status(500).send({
          error:[{msg:'could not register'}]
      })
  }
});
module.exports = authRoute