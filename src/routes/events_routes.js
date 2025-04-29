import globalMiddlewares from '../middlewares/global_middlewares.js';
import { Router } from 'express';
import eventController from '../controllers/events_Controller.js';

const eventRoute = Router();

eventRoute.post('/events', globalMiddlewares.jwtRequired, globalMiddlewares.isMaster, eventController.createEvents);
eventRoute.get('/events', globalMiddlewares.jwtRequired, eventController.getAllEvents);

export default eventRoute;