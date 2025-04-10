import { database } from "../database/db.js";
import { QueryTypes } from "sequelize";

const find_diocese_by_name = async (name) => {
  try {
    const [result] = await database.query(
      `SELECT diocese_id FROM public.diocese WHERE name = :name`,
      {
        replacements: { name: name },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  } catch (error) {
    console.error("Error finding diocese by name:", error);
    throw new Error("Error finding diocese by name");
  }
};

export default {
  find_diocese_by_name,
};
