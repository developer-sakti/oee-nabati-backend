FROM node:lts-slim

ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
# ARG NODE_ENV
ARG BACKEND_PORT

# ENV NODE_ENV=${NODE_ENV}
ENV NODE_ENV=development
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV BACKEND_PORT=${BACKEND_PORT}

RUN mkdir -p /backend
WORKDIR /backend

RUN apt update
RUN apt upgrade -y
RUN apt install python -y
RUN npm config set python /usr/bin/python
RUN npm i -g npm

COPY package.json .

RUN npm i

COPY . /backend

RUN sed -i "s/DB_USER/$DB_USER/g" ormconfig.json
RUN sed -i "s/DB_PASSWORD/$DB_PASSWORD/g" ormconfig.json
RUN sed -i "s/DB_NAME/$DB_NAME/g" ormconfig.json

EXPOSE 8081
CMD ["npm", "run", "start"]
