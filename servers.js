const express = require('express')
const connectDb = require('./config/connectDB')
const authRoute = require('./routes/auth')
const MedicationRoute = require('./routes/medication')
const PharmacieRoute = require('./routes/pharmacie')


const app = express()
require('dotenv').config()

connectDb()
app.use(express.json()) 
app.use("/api/auth" , authRoute)
app.use("/api/medication", MedicationRoute)
app.use("/api/pharmacie", PharmacieRoute)


app.listen(process.env.port,()=> console.log('port is running'))