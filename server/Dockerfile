FROM node:16-alpine3.11

RUN apk add bash

WORKDIR /server

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD ["node","app.js"]