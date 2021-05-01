# Squeaky!

### Requirements
- Node.js v14
- Ruby 3.0.0
- Redis 5.x
- Postgres 12.x
- Or, Docker and docker-compose

In order to send mail through the API, you will need AWS credentials located at ~/.aws, @lemonjs can create you some if you need them.

### Installation
```shell
$ git clone git@github.com:squeaky-ai/squeaky.git

# Install dependencies and start the server
$ cd squeaky/server
$ bundle install
$ rails server

# Install dependencies and start the client
$ cd squeaky/client
$ yarn install
$ yarn dev

# Or, start with docker
$ docker-compose build
$ docker-compose up
```

### Create the database and run migrations
```shell
# If using docker, first run:
# $ docker-compose exec server sh

$ rails db:create
$ rails db:migrate
```
