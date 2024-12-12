const express = require('express')
require('dotenv').config()

const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workoutRoutes')
const userRoutes = require('./routes/userRoutes')

//express app 
const app = express()

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () =>
            console.log('connected to db & server is listening to port:', process.env.PORT))
    })

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)