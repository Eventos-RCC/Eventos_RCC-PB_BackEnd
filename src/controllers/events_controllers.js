import eventServices from '../services/event_services.js';

const createEvents = async (req, res) => {
    try {
        const response = await eventServices.create_event({ ...req.body, user_created_id: req.userId });
        
        return res.status(201).send(response)
    }catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).send({ message: error.message });
    }
}

const getAllEvents = async (req, res) => {
    try {
        const response = await eventServices.find_All_events();
        return res.status(200).send(response);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).send({ message: error.message });
    }
}


const deleteEvent = async (req, res) => { 
    try {
        const { event_id } = req.query;
        return res.status(200).send(await eventServices.deleteEvent(event_id));
    }catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).send({ message: error.message });
    }
}

const getEventById = async (req, res) => {
    try {
        const { event_id } = req.query;
        const response = await eventServices.find_event_by_id(event_id);
        return res.status(200).send(response);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).send({ message: error.message });
    }
}

const updateEvent = async (req, res) => {
    try {
        const { event_id } = req.query;
        const response = await eventServices.updateEvent(event_id, req.body);
        return res.status(200).send(response);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).send({ message: error.message });
    }
}

export default {
    createEvents, 
    getAllEvents,
    deleteEvent,
    getEventById,
    updateEvent
}