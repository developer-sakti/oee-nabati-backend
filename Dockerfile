FROM node:lts-alpine

ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG NODE_ENV
ARG BACKEND_PORT

ENV NODE_ENV=${NODE_ENV}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV BACKEND_PORT=${BACKEND_PORT}

RUN mkdir -p /backend
WORKDIR /backend

RUN apk update
RUN apk upgrade
RUN apk add --update alpine-sdk gcc bash sed build-base python
RUN npm config set python /usr/bin/python
RUN npm i -g npm

COPY package.json .

RUN npm i --silent --production

COPY . /backend

RUN sed -i "s/DB_USER/$DB_USER/g" ormconfig.json
RUN sed -i "s/DB_PASSWORD/$DB_PASSWORD/g" ormconfig.json
RUN sed -i "s/DB_NAME/$DB_NAME/g" ormconfig.json

EXPOSE 8081
CMD ["npm", "run", "start"]
