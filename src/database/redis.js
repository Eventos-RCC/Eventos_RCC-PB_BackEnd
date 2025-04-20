import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = redis.createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => console.error('Redis Client Error', err));

const connectRedis = async () => {
    if (!client.isOpen) {
        await client.connect();
        console.log('\nRedis connected');
    }
};

export { client, connectRedis };
