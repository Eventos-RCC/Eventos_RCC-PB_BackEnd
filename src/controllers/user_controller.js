import userServices from "../services/user_services.js";


const create_user = async (req, res) => {
    const body = req.body;
    try {
        const creat_user = await userServices.initiateUserRegistration(body);
        return res.status(201).send({ message: "Código Enviado para o email: ", creat_user });
    } catch (err) { // Adicionado o parâmetro error
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
}

const CodeVerification = async (req, res) => {
    const body = req.body;
    const {email} = req.params;
    try {
        const Verication_code = await userServices.confirmVerificationCodeAndCreateUser(body, email);
        return res.status(200).send({message: "Código verificado com Sucesso. \nUsuário cadastrado: ", })
    } catch (err) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message})
    }
}

export default {
    create_user,
    CodeVerification
}