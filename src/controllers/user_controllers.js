import userServices from "../services/user_services.js";


const create_user = async (req, res) => {
    const body = req.body;
    try {
        const result = await userServices.initiateUserRegistration(body);
        return res.status(201).send(result);
    } catch (err) { // Adicionado o parâmetro error
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
}

const CodeVerification = async (req, res) => {
    const body = req.body;
    const { email } = body;
    try {
        const Verication_code_and_create_user = await userServices.confirmVerificationCodeAndCreateUser(body, email);
        return res.status(200).send(Verication_code_and_create_user);
    } catch (err) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message})
    }
}

const login = async (req, res) => {
    const body = req.body;
    try {
        const result = await userServices.login(body);
        return res.status(200).send(result);
    }catch (err) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
}

const getUserData = async (req, res) => {
    const userId = req.userId;
    try {
        const response = await userServices.findUserData(userId);
        return res.status(200).send(response)
    } catch (err){
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message })
    }
}

const updateOrCreateaddress = async (req, res) => {
    const { address_id } = req.query;
    try {
        const response = await userServices.updateOrCreateAdress(req.userId, address_id, req.body);
        return res.status(200).send(response);
    } catch (err) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message})
    }
}

export default {
    create_user,
    CodeVerification,
    login, 
    getUserData,
    updateOrCreateaddress
}