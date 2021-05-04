FROM node:14.16-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json /app
COPY yarn.lock /app

RUN yarn install --production=false

RUN yarn build

COPY . /app

EXPOSE 3000

CMD ["yarn", "start"]
