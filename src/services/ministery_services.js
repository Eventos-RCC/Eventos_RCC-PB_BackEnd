import ministeryRepository from '../repositories/ministery_repository.js';
import userRepository from '../repositories/user_repository.js';

import logger from "../utils/logger.config.js";
import CustomError from "../utils/CustomError.js";


const findAllMinisteries = async () => {
  logger.info("Fetching all ministeries");
  const ministeries = await ministeryRepository.getAllMinisteries();
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

  if (body === undefined) {
    return { message: "Nenhum ministério seleciionado"}
  }

  const user = await userRepository.findUserById(userId);
  if (!user) {
    logger.error("User not found")
    throw new CustomError('User not found', 404);
  }

  const abbreviations = Object.entries(body)
    .filter(([__, value]) => value === true)
    .map(([key]) => key);

  if (abbreviations.length === 0) {
    logger.error("No ministery selected");
    throw new CustomError("No ministery selected", 400);
  }

  const ministeries = await ministeryRepository.getMinisteryByAbbreviation(abbreviations);

  if (!ministeries || ministeries.length === 0) {
    logger.error("No ministeries found for given abbreviations");
    throw new CustomError("No ministeries found for given abbreviations", 404);
  }

  const ministeryIds = ministeries.map(m => m.id);
  const userMinisteries = await user.addMinistery(ministeryIds);
  if (!userMinisteries) {
    logger.error("Erro ao adicionar Ministério do usuáro")
    throw new CustomError("Erro ao adicionar Ministério do usuáro", 500)
  }

  return {
    ministeriesId: userMinisteries.ministeries_id
  };
}

const findAllMinisteriesBrAbbreviation = async (abbreviation) => {
  logger.info("Fetching all ministeries with abbreviation");

  if (!abbreviation) {
    logger.error("Abbreviation is required");
    throw new CustomError("Abbreviation is required", 400);
  }

  const ministeries = await ministeryRepository.getMinisteryByAbbreviation(abbreviation);
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

  const ministeries = await ministeryRepository.getMinisteryById(ministeriesId.id);
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
  findAllMinisteriesBrAbbreviation,
  addUserToMinistery
}