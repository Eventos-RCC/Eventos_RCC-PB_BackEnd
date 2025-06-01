import path from "path";
import userServices from "../services/user_services.js";


const create_user = async (req, res) => {
    const body = req.body;
    try {
        const result = await userServices.initiateUserRegistration(body);

        const maxAgeMs = 6 * 60 * 60 * 1000;

        res.cookie('jwt', result.token, {
            httpOnly: true,
            maxAge: maxAgeMs,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            path: '/'
        });
        
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
        const VericationCodeAndCreatingUser = await userServices.confirmVerificationCodeAndCreateUser(body, email);
        return res.status(200).send(VericationCodeAndCreatingUser);
    } catch (err) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message})
    }
}

const login = async (req, res) => {
    const body = req.body;
    try {
        const result = await userServices.login(body);

        const maxAgeMs = 6 * 60 * 60 * 1000;

        res.cookie('jwt', result.token, {
            httpOnly: true,
            maxAge: maxAgeMs,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            path: '/'
        });

        return res.status(200).send({ message: result.message, userName: result.userName });
    }catch (err) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
}

const logout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        path: '/',
    })
    res.status(200).send({
        message: 'Logout successful'
    });
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
    logout,
    getUserData,
    updateOrCreateaddress
}