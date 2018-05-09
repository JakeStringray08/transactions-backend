FROM node:8.9-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent --production
COPY ./dist ./dist
EXPOSE 3000
CMD npm start