FROM node:6.9-alpine

COPY . /var/www/sites/vroom-new

WORKDIR /var/www/sites/vroom-new

EXPOSE 1337

RUN apk add --update \
    python \
    python-dev \
    make \
    g++ \
    && npm i -g yarn \
    && yarn global add pm2 --prefix /usr/local \
    && yarn install \
    && yarn run clean \
    && yarn run build:prod

CMD ["pm2", "start", "process.yml", "--no-daemon"]

# ROK - CircleCI does not support a new enough version of docker compose :/
# HEALTHCHECK CMD curl --fail http://localhost:1337/_monitor/status || exit 1
