# Stage 1: Build the React app
FROM node:18 AS build

WORKDIR /app
COPY package.json ./ 
RUN npm install --frozen-lockfile

COPY . . 
RUN npm run build 
 
# Stage 2: Serve the React app with Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
