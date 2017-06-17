FROM node:latest

# create app folder
RUN mkdir -p /usr/scr/app
# set current workdir
WORKDIR /usr/src/app

# install requirements
RUN apt-get update
RUN apt-get install nano
RUN npm install -g yarn

# Install app dependencies
COPY package.json /usr/src/app/
RUN yarn
RUN npm install -g babel-cli

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "yarn", "start" ]
