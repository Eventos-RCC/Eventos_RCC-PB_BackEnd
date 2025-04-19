FROM node:18-alpine

WORKDIR /api

COPY . . 

RUN rm -rf node_modules
RUN npm install 

CMD ["npm", "start"]

EXPOSE 8000