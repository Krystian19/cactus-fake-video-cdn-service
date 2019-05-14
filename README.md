# Cactus Fake Video CDN
[![Build Status](https://travis-ci.org/Krystian19/cactus-fake-video-cdn-service.svg?branch=master)](https://travis-ci.org/Krystian19/cactus-fake-video-cdn-service) [![Code Climate](https://codeclimate.com/github/Krystian19/cactus-fake-video-cdn-service/badges/gpa.svg)](https://codeclimate.com/github/Krystian19/cactus-fake-video-cdn-service) [![Test Coverage](https://codecov.io/gh/Krystian19/cactus-fake-video-cdn-service/branch/master/graph/badge.svg)](https://codecov.io/gh/Krystian19/cactus-fake-video-cdn-service)

Use this script as a service to mimic a real content delivery network for video files for local development.

## Requirements
```sh
docker -v
  Docker version 18.03.0-ce # or later

git-lfs --version
  git-lfs/2.5.2 (GitHub; darwin amd64; go 1.11) # Or later
```

## Docker-compose setup example
How to use it inside a docker-compose file:
```yaml
version: '3'

services:
  cactus_video_cdn: # cactus-video-cdn service
    container_name: cactus_video_cdn
    build:
      ./cactus-video-cdn
    volumes:
      - ./cactus-video-cdn/src/videos/:/app/src/videos/
    ports: ['9000:3000']
```

## Standalone Setup

Inside the project's directory ...

Build the docker image:
```
docker build --no-cache -t janguzman/cactus_video_cdn .
```

### Run the project

Then create docker container. (Note: where "$(pwd)" is the absolute path to your local repo):
```sh
docker run -ti --name=cactus_video_cdn -d -v $(pwd)/videos:/var/www/hls/live -p 9000:80 -p 1935:1935 janguzman/cactus_video_cdn
```

<!-- ## Run the tests
Assuming the container's name is "cactus_video_cdn", run this:
```sh
docker exec -ti cactus_video_cdn ava
``` -->

## Generate HLS files from a video file

Code Gist: `https://gist.github.com/mrbar42/ae111731906f958b396f30906004b3fa`
Explanation: `https://docs.peer5.com/guides/production-ready-hls-vod/`

```sh
./create-vod-hls.sh <video_file.mp4>
```

## Usage instructions
Just place the videos inside the src/videos directory. And refer to the video by the fullname of the file (without the file extension):
```
http://localhost:9000/live/test.mp4
```

## License
MIT © [Jan Guzman](https://github.com/Krystian19)
