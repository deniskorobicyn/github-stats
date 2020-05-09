FROM node:14

RUN apt-get update && apt-get install -yy git
WORKDIR /app