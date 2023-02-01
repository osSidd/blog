require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection

db.on('open', () => {
    console.log('db connected')
})

db.on('error', (err) => {
    console.error.bind(console, err.message)
})