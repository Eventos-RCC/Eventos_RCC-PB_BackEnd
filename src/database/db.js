import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import User from "../models/user_models.js";
import Diocese from "../models/diocese_models.js";
import { Events, TypeEvents } from "../models/event_models.js";
import Adress from "../models/adresses_models.js";
import PrayerGroup from "../models/prayer_groups.js";
import Ministery from "../models/ministery_models.js";
import { Role, Permission, RolePermission, UserRole } from "../models/roles_models.js";

dotenv.config();

const database = new Sequelize(process.env.POSTGRE_URL, {
  define: {
    timestamps: true,
    underscored: true,
  },
  logging: false,
});

const conectDataBase = async () => {
  try {
    console.log("\nConnecting to database...");
    await database.authenticate();
    console.log("Connected to database\n");
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
};

Diocese.init(database);
User.init(database);
Events.init(database);
TypeEvents.init(database);
Adress.init(database);
PrayerGroup.init(database);
Ministery.init(database);
Role.init(database);
Permission.init(database);
RolePermission.init(database);
UserRole.init(database);

Diocese.associate(database.models);
User.associate(database.models);
Events.associate(database.models);
TypeEvents.associate(database.models);
Adress.associate(database.models);
PrayerGroup.associate(database.models);
Ministery.associate(database.models);
Role.associate(database.models);
Permission.associate(database.models);
//RolePermission.associate(database.models); 
//UserRole.associate(database.models);

export { database, conectDataBase };
