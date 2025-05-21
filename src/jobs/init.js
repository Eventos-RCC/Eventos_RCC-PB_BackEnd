import Queue from './lib/queue.js';
import logger from '../utils/logger.config.js';

// Inicializar o processamento de jobs
logger.info('Initializing job queues');
Queue.process();

// Exportar para uso em outros módulos
export default Queue;
