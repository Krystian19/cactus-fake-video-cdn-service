# Fake Video CDN
[![Build Status](https://travis-ci.org/Krystian19/fake-video-cdn.svg?branch=master)](https://travis-ci.org/Krystian19/fake-video-cdn) [![Code Climate](https://codeclimate.com/github/Krystian19/fake-video-cdn/badges/gpa.svg)](https://codeclimate.com/github/Krystian19/fake-video-cdn) [![Test Coverage](https://codeclimate.com/github/Krystian19/fake-video-cdn/badges/coverage.svg)](https://codeclimate.com/github/Krystian19/fake-video-cdn/coverage)

Use this script as a service to mimic a real content delivery network for video files.

## Requirements
```sh
docker -v
Docker version 18.03.0-ce # or later
```

## Docker-compose setup example
How to use it inside a docker-compose file:
```yaml
version: '3'

services:
  fake_video_cdn: # fake-video-cdn service
    build:
      ./fake-video-cdn
    volumes:
      - ./fake-video-cdn/src/videos/:/app/src/videos/
    ports: ['9000:3000']
```

## Standalone Setup

Inside the project's directory ...

Build the docker image:
```
docker build --no-cache -t janguzman/fake_video_cdn .
```

### Run the project

Then create docker container. (Note: where "$(pwd)" is the absolute path to your local repo):
```sh
docker run -ti --name=fake_video_cdn -d -v $(pwd)/src/videos/:/app/src/videos/ -p 9000:3000 janguzman/fake_video_cdn
```

## Run the tests
Assuming the container's name is "fake_video_cdn", run this:
```sh
docker exec -ti fake_video_cdn ava
```

## Usage instructions
Just place the videos inside the src/videos directory. And refer to the video by the fullname of the file (without the file extension):
```
http://localhost:9000/test
```

<!-- ### Todo list
- [x] Setup the Dockerfile.
- [ ] Setup examples and use cases. -->

## License
MIT © [Jan Guzman](https://github.com/Krystian19)
