FROM node:lts-alpine
# App directory
WORKDIR /usr/src/app
# install dependencies
# Wildcard installs package.json and package-lock.json
COPY package*.json ./

RUN chown -R node:node /usr/src/app
RUN npm install --production
# Bundle the app
COPY . .

# Must be double quote?
CMD [ "node", "index.js" ]
USER node