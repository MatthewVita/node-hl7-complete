FROM openjdk:8-slim-buster
LABEL authors="MatthewVita, privateOmega"

ARG NODE_VERSION=14.17.6
ARG NODE_PACKAGE=node-v$NODE_VERSION-linux-x64
ARG NODE_HOME=/opt/$NODE_PACKAGE

ENV NODE_PATH $NODE_HOME/lib/node_modules
ENV PATH $NODE_HOME/bin:$PATH

RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    python2 \
    build-essential

RUN curl https://nodejs.org/dist/v$NODE_VERSION/$NODE_PACKAGE.tar.gz | tar -xzC /opt/
RUN npm config set unsafe-perm true
RUN npm install pm2 -g

WORKDIR /node-hl7-complete
COPY package.json /node-hl7-complete
RUN npm install
COPY server.js /node-hl7-complete

EXPOSE 8000

CMD ["pm2-runtime", "server.js"]