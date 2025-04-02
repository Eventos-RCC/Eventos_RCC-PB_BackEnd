import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_USER,
    database: process.dotenv.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const conectDataBase = async () => {
    try {
        console.log('Connecting to database...');
        await pool.connect();
        console.log('Connected to database');
    }catch(error) {
        console.log('Error connecting to database:', error);
    };
};

export default conectDataBase;