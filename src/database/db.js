import dotenv from 'dotenv';
import { Sequelize } from "sequelize";

dotenv.config();

const database = new Sequelize(
    process.env.POSTGRE_URL,
    {
        define: {
            timestamps: true,
            underscored: true,
        }
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