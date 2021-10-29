FROM node:14.18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json /app
COPY yarn.lock /app

RUN yarn install --production=false --ignore-engines

COPY . /app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
