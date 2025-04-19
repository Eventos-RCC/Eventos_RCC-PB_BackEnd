import dotenv from 'dotenv';
import { Sequelize } from "sequelize";

dotenv.config();


const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
    }
);


const conectDataBase = async () => {
    try {
        console.log('\nConnecting to database...');
        await database.authenticate();
        console.log('Connected to database\n');
    }catch(error) {
        console.log('Error connecting to database:', error);
    };
};

export { database, conectDataBase };