FROM node:carbon-slim

# Create app directory
WORKDIR /git/academy-api

# Install app dependencies
COPY package.json /git/academy-api/
RUN npm install
RUN npm install graphql-yoga
RUN npm install apollo-server
RUN npm install apollo-upload-server
# Bundle app source
COPY . /git/academy-api/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]

EXPOSE 5500
