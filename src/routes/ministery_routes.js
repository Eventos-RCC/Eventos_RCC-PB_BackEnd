import ministeryController from '../controllers/ministery_controller.js';
import { Router } from 'express';
import globalMiddlewares from '../middlewares/global_middlewares.js';

const ministeryRoute = Router();

ministeryRoute.get('/', globalMiddlewares.jwtRequired, ministeryController.getAllMinisteries);
ministeryRoute.get('/:abbreviation', globalMiddlewares.jwtRequired, ministeryController.getMinisteriesByAbbreviation);

export default ministeryRoute;