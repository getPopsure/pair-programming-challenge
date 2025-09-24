FROM node:24-bullseye

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "dev" ]
