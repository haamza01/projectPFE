const mongoose = require('mongoose')

const connectDb= async()=>{
    try {
    await    mongoose.connect(process.env.MONGO_URL)
    console.log('db is connected')
    } catch (error) {
        console.log({msg:'db not connected',error})
        
    }
}
module.exports=connectDb