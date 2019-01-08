FROM node:10.13-alpine

WORKDIR /usr/PostServer/

COPY ["PostServer/package.json", "PostServer/package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run docker