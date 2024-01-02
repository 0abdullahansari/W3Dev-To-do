FROM node:18

WORKDIR /usr/src/app

COPY ./src ./src

COPY ./.env ./env

COPY ./nodemon.json ./nodemon.json

COPY package*.json ./

COPY ./tsconfig.json ./tsconfig.json 

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
