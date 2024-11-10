FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY public ./public
COPY src ./src
RUN npm install
COPY . . 
CMD ["npm", "run", "dev"]
