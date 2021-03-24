FROM node:lts-buster

# App directory
WORKDIR /usr/src/app

# install dependencies
# Wildcard installs package.json and package-lock.json
COPY package*.json ./

RUN chown -R node:node /usr/src/app
RUN npm install
ENV NODE_ENV=development
ENV PORT=3010
ENV DBUSER=student
ENV DBPASS_DEV=student
ENV DBPASS_PROD=Daybreak$Magnetic$Elderly
ENV DBNAME=sdcProduct
# Bundle the app
COPY . .

EXPOSE 3010
# Must be double quote?
CMD [ "node", "index.js" ]
USER node