FROM node:14.15.0-alpine
WORKDIR /usr/app
COPY package.json .
COPY node_modules .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]