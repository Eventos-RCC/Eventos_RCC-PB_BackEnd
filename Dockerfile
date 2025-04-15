FROM node:22.14.0-alpine3.17

WORKDIR /api

COPY . . 

RUN rm -rf node_modules
RUN npm install 

CMD ["npm", "start"]

EXPOSE 8000