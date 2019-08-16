FROM node:lts-alpine

RUN mkdir -p /backend
WORKDIR /backend

RUN apk update
RUN apk upgrade
RUN apk add build-dependencies gcc bash sed
RUN apk cache clean
RUN npm i -g npm

COPY package.json .

RUN npm i --silent --production

COPY . /backend

RUN sed -i 's/DB_USER/${DB_USER}/g' ormconfig.json
RUN sed -i 's/DB_PASSWORD/${DB_PASSWORD}/g' ormconfig.json
RUN sed -i 's/DB_NAME/${DB_NAME}/g' ormconfig.json

EXPOSE 8081
CMD ["npm", "run", "start"]
