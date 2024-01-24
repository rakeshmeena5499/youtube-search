FROM node:21.0-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE 3000

CMD [ "node", "app.js" ]