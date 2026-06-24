FROM node:lts-alpine3.24

WORKDIR /server

COPY ./package.json ./package-lock.json ./server.js .

RUN npm ci

ENV PORT=6000

EXPOSE 6000

CMD ["node", "server.js"]
