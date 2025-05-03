import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
import User from '../models/user_models.js';
import Diocese from '../models/diocese_models.js';
import {Events, TypeEvents} from '../models/event_models.js';

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

Diocese.init(database);
User.init(database);
Events.init(database);
TypeEvents.init(database);

Diocese.associate(database.models);
User.associate(database.models);
Events.associate(database.models);
TypeEvents.associate(database.models);

export { database, conectDataBase };