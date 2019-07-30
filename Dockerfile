FROM node:8.15.0

VOLUME [ "/usr/src/app" ]

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN npm install && npm update && npm audit && npm audit fix

CMD ["npm", "run" "start:prod"]