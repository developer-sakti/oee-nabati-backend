FROM node:lts-slim

RUN mkdir -p /backend
WORKDIR /backend

RUN apt update \
    && apt upgrade -y \
    && apt install build-essential -y \
    && apt autoremove -y \
    && apt clean \
    && npm i -g npm

COPY . /backend
RUN rm package-lock.json

RUN npm i
# RUN npm run prestart:prod

EXPOSE 8081
CMD ["npm", "run", "start:prod"]