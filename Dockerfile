FROM node:10.15.3-alpine
LABEL Jan Guzman <janfrancisco19@gmail.com>

WORKDIR /app

RUN apk update && apk upgrade && \
    apk add --no-cache git

COPY . /app
EXPOSE 3000

RUN npm install -g yarn ava-cli
RUN yarn install

CMD ["yarn", "start"]