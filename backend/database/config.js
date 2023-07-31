const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {        
        await mongoose.connect(process.env.DB_CONN);
        console.log("Conectado a la BBDD");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {dbConnection}