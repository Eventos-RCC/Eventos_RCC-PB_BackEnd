import ministeryUser from '../repositories/ministery_repository.js';

import logger from "../utils/logger.config.js";
import CustomError from "../utils/CustomError.js";


const findAllMinisteries = async () => {
  logger.info("Fetching all ministeries");
  const ministeries = await ministeryUser.getAllMinisteries();
  if (!ministeries) {
    logger.error("No ministeries found");
    throw new CustomError("No ministeries found", 404);
  }
  return {
    message: "Ministeries fetched successfully",
    ministeries
  }
}

const addUserToMinistery = async (userId, body) => { 
  logger.info("Adding user to ministery");
  const { mma, mcs, mf, mi, mocle, mp, mph, mfp, mj, mpf, mca, mmo, mrcc, ms, mur } = body;
  
  const ministereyUser = Object.entries(body)
    .filter(([__, value]) => value === true)
    .map(([key, value]) => ({ name: key, status: value }));
  
  if (ministereyUser.length === 0) {
    logger.error("No ministery selected");
    throw new CustomError("No ministery selected", 400);
  }

  await ministeryUser.addMinisteryToUser(userId, ministereyUser);
}

const findAllMinisteriesBrAbbreviation = async (abbreviation) => {
  logger.info("Fetching all ministeries with abbreviation");

  if (!abbreviation) {
    logger.error("Abbreviation is required");
    throw new CustomError("Abbreviation is required", 400);
  }

  const ministeries = await ministeryUser.getMinisteryByAbbreviation(abbreviation);
  if (!ministeries) {
    logger.error("No ministeries found");
    throw new CustomError("No ministeries found", 404);
  }
  return {
    message: "Ministeries fetched successfully",
    ministeries
  }
}

const findMinisteriesById = async (ministeriesId) => {
  logger.info("Fetching ministeries by ID");

  if (!ministeriesId) {
    logger.error("Ministery ID is required");
    throw new CustomError("Ministery ID is required", 400);
  }

  const ministeries = await ministeryUser.getMinisteryById(ministeriesId.id);
  if (!ministeries) {
    logger.error("No ministeries found");
    throw new CustomError("No ministeries found", 404);
  }
  return {
    message: "Ministeries fetched successfully",
    ministeries
  }
}

export default {
  findAllMinisteries,
  findAllMinisteriesBrAbbreviation
}