const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
            'useUnifiedTopology': true
        })
        console.log('db connected ...');
    } catch (error) {
        console.log(error);
        throw new Error( 'Database unavailable...')
    }
}

module.exports = dbConnection;