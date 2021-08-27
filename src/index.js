require('./models/User')
require('./models/Track')
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')
var cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = 'mongodb+srv://username:password@cluster0.fsxb7.mongodb.net/db?retryWrites=true&w=majority'
mongoose.connect(mongoUri,{
    useNewUrlParser: true,
})

mongoose.connection.on('connected', () => {
    console.log('===Database connected===')
})

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongoDb', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${ req.user.email }`)
})

app.listen(3000, () => {
    console.log("Listening on Port 3000")
})
