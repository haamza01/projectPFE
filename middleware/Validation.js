const { body, validationResult } = require('express-validator');

exports.registervalidation=[
    body("email", 'not valid email').isEmail(),
    body("password",'should be at less 8 caractres').isLength({min:8})
]
 exports.validation =(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next()
}