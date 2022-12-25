FROM node:19.2-alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package.json tsconfig.json swagger.json wait.sh .env ./

COPY src ./src

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

RUN chmod +x /wait

RUN npm install 


EXPOSE 8080

CMD /wait && npm start