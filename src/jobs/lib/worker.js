import Queue from './queue.js';
import logger from '../../utils/logger.config.js';

// Inicializar o processamento de jobs
logger.info('Starting job processing worker');
Queue.process();

// Tratamento de sinais para encerramento gracioso
process.on('SIGTERM', async () => {
    logger.info('Worker shutting down...');
    // Código para encerramento gracioso das filas
    process.exit(0);
});

export default Queue;
