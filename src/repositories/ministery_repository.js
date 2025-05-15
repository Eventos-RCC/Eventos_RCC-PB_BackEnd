//import User from "../models/user.js";
import Ministery from "../models/ministery_models.js";

import logger from "../utils/logger.config.js";
import CustomError from "../utils/CustomError.js";


class MinisteryUserRepository {
  async getAllMinisteries() {
    try {
      const ministeries = await Ministery.findAll({
        attributes: ["id", "name", "abbreviation"],
        raw: true,
      });

      return ministeries;
    } catch (error) {
      logger.error(`Error fetching ministeries: ${error.message}`);
      throw new CustomError("Error accessing database", 500);
    }
  }

  async getMinisteryByAbbreviation(abbreviation) {
    try {
      const ministery = await Ministery.findOne({
        where: { abbreviation: abbreviation },
        attributes: ["id", "name", "abbreviation"],
        raw: true,
      });
      return ministery;
    } catch (error) {
      logger.error(
        `Error fetching ministery by abbreviation: ${error.message}`
      );
      throw new CustomError("Error accessing database", 500);
    }
  }

  async getMinisteryById(ministeryId) {
    try {
      const ministery = await Ministery.findByPk(ministeryId,
        { where: { id: ministeryId } },
        {
          attributes: ["id", "name", "abbreviation"],
          raw: true,
        });

      return ministery;
    } catch (error) {
      logger.error(`Error fetching ministery by ID: ${error.message}`);
      throw new CustomError("Error accessing database", 500);
    }
  }

  async addMinisteryToUser(userId, ministeryId) {
    try {
      await userId.addMinistery(ministeryId);

      return { message: "Ministery added to user successfully" };
    } catch (error) {
      logger.error(`Error adding ministery to user: ${error.message}`);
      throw new CustomError("Error accessing database", 500);
    }
  }
}

export default new MinisteryUserRepository();
