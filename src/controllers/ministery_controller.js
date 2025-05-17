import ministeriesServices from '../services/ministery_services.js';

const getAllMinisteries = async (req, res) => {
  try {
    const result = await ministeriesServices.findAllMinisteries();
    return res.status(200).send(result);
  }
  catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
}

const getMinisteriesByAbbreviation = async (req, res) => {
  const {abbreviation} = req.params;
  try {
    const result = await ministeriesServices.findAllMinisteriesBrAbbreviation(abbreviation);
    return res.status(200).send(result);
  }
  catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
}

const addUserToMinistery = async (req, res) => {
  const userId = req.userId;
  const body = req.body;

  try {
    await ministeriesServices.addUserToMinistery(userId, body);
    return res.status(200).send({ message: "User added to ministery successfully" });
  }
  catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
}


export default {
  getAllMinisteries,
  getMinisteriesByAbbreviation, 
  addUserToMinistery
}