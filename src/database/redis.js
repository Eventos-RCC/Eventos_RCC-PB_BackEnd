import redis from 'redis';
import dotenv from 'dotenv';;

dotenv.config();

const redis_client = async () => {
    const client = redis.createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
    });

    try {
        await client.connect();
        console.log('Redis connected');
        return client;
    } catch (error) {
        console.error("Falha ao conectar ao Redis:", error);
        return null;
    }
};

const redisClient = redis_client();