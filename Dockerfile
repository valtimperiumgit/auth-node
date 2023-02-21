FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 6000

CMD ["npm", "start"]