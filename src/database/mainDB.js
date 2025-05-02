import User from '../models/user_models.js';
import Diocese from '../models/diocese_models.js';
import { database } from './db.js';

Diocese.init(database);
User.init(database);

Diocese.associate(database.models);
User.associate(database.models);

export default database;