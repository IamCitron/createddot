require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const prayerRoutes = require('./routes/prayerRoutes')

// create an express app
const app = express()

// middleware
// commented out as making api req fail
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/prayers', prayerRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log(`connected to DB, listening on PORT: ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })


