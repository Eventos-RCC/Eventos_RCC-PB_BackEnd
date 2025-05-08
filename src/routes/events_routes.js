import globalMiddlewares from '../middlewares/global_middlewares.js';
import { Router } from 'express';
import eventController from '../controllers/events_controllers.js';

const eventRoute = Router();

eventRoute.post('/', globalMiddlewares.jwtRequired, globalMiddlewares.isMaster, eventController.createEvents);
eventRoute.get('/all', globalMiddlewares.jwtRequired, eventController.getAllEvents);
eventRoute.delete('/', globalMiddlewares.jwtRequired, globalMiddlewares.isMaster, eventController.deleteEvent);
eventRoute.get('/', globalMiddlewares.jwtRequired, eventController.getEventById);
eventRoute.patch('/adress', globalMiddlewares.jwtRequired, globalMiddlewares.isMaster, eventController.updateOrCreateAdressEvent);


export default eventRoute;