FROM node:10.15.3

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src
ADD app/package.json /src/package.json
RUN npm install

ADD app/nodemon.json /src/nodemon.json
ADD app/swagger.json /src/swagger.json
ADD app/.env /src/.env

EXPOSE 3000
EXPOSE 5432


CMD npm start
