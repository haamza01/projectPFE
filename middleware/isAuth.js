
const jwt = require("jsonwebtoken")
const Usershema = require("../models/auth")


const isAuth = async (req,res,next)=>{

    try {
      
        const token=req.headers['authorisation']
        if (!token){return  res.send("you are not authored")   }
        var decoded = jwt.verify(token, process.env.secretocken);

        const user = await Usershema.findById(decoded._id)
        req.user=user
next()
    } catch (error) {
        res.status(500).send({error:[{msg:"token server error"}]})
    }

}
module.exports=isAuth