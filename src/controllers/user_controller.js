import userServices from "../services/user_services.js";


const create_user = async (req, res) => {
    const body = req.body;
    try {
        const creat_user = await userServices.creat_user(body);
        return res.status(201).send({ message: "Usuário criado com sucesso", creat_user });
    } catch (error) { // Adicionado o parâmetro error
        console.error('Erro ao criar usuário:', error);
        return res.status(500).send({ message: "Erro ao criar usuário", error: error.message });
    }
}

export default {
    create_user
}