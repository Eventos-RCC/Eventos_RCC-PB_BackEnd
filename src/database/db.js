import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const conectDataBase = async () => {
    try {
        console.log('\nConnecting to database...');
        await pool.connect();
        console.log('Connected to database\n');
    }catch(error) {
        console.log('Error connecting to database:', error);
    };
};

export default conectDataBase;