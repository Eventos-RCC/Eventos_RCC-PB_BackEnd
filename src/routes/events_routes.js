import globalMiddlewares from '../middlewares/global_middlewares.js';
import checkPermission from '../middlewares/check_Permission_middlewares.js';
import { Router } from 'express';
import eventController from '../controllers/events_controllers.js';

const eventRoute = Router();

eventRoute.post('/', globalMiddlewares.jwtRequired, checkPermission("create:event"), eventController.createEvents);
eventRoute.get('/all', globalMiddlewares.jwtRequired, eventController.getAllEvents);
eventRoute.delete('/', globalMiddlewares.jwtRequired, checkPermission("delete:event"), eventController.deleteEvent);
eventRoute.get('/', globalMiddlewares.jwtRequired, eventController.getEventById);
eventRoute.patch('/adress', globalMiddlewares.jwtRequired, checkPermission("update:event"), eventController.updateOrCreateAdressEvent);


export default eventRoute;