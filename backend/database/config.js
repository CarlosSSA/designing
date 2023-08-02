import mongoose from 'mongoose';
import dotenv from 'dotenv';

const dbConnection = async() => {
    dotenv.config();
    try {        
        await mongoose.connect(process.env.DB_CONN);
        console.log("Conectado a la BBDD");
        console.log("la variable de entorno es ",process.env.DB_CONN);
    } catch (error) {
        console.log(error);
    }
};

export { dbConnection };