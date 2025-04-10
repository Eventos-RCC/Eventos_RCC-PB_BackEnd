import userServices from "../services/user_services.js";


const create_user = async (req, res) => {
    const body = req.body;
    try {
        const creat_user = await userServices.creat_user(body);
        return res.status(201).send({ message: "Usuário criado com sucesso", creat_user });
    } catch (err) { // Adicionado o parâmetro error
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
}

export default {
    create_user
}