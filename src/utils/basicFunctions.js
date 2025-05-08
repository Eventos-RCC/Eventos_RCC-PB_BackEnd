import logger from "./logger.config.js";

const generateCodeValdation = async () => {
  logger.info("Generating code validation");
  const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
  return randomPart;
};

const formatDateForDatabase = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`; // Retorna no formato yyyy-mm-dd
};

export { formatDateForDatabase, generateCodeValdation };
