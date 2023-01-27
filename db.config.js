const db = function(){
    const mongoose = require('mongoose');
    mongoose.connect(process.env.MONGO_URL);

    const db = mongoose.connection;

    db.on('open', () => {console.log('database connected')});
    db.on('error', (err) => console.error.bind(console, err.message));
}

module.exports = db;