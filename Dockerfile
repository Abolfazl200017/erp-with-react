FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY public ./public
COPY src ./src
RUN npm install
COPY . . 
CMD ["npm", "run", "dev"]
# docker run -p 8080:8080 erp-with-react
