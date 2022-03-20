FROM node:lts-alpine
ENV PORT=3000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
EXPOSE 3000
RUN npm install
RUN npm install ts-node -g
COPY . /usr/src/app

CMD ["ts-node", "./src/index.ts"]