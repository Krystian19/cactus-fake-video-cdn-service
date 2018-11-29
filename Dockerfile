FROM ubuntu:16.04
MAINTAINER Jan Guzman <janfrancisco19@gmail.com>

# Setup global vars
ENV SERVER_PORT=3000

WORKDIR /app

# Setup container dependencies
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y curl git

# Install node related stuff
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

COPY . /app
EXPOSE 3000

# Install service manager
RUN npm install -g yarn ava-cli
RUN yarn install

CMD ["yarn", "start"]