import eventServices from '../services/event_services.js';

const createEvents = async (req, res) => {
    try {

        const userId = req.registration_id;
        const response = await eventServices.create_event({ ...req.body, master_id: userId });
        
        return res.status(201).send(response)
    }catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).send({ message: error.message });
    }
}


export default {
    createEvents
}