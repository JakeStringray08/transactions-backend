FROM node:8.9-alpine
WORKDIR /usr/src/app
ENV PORT=3000
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
RUN npm run compile
EXPOSE 3000
CMD npm start