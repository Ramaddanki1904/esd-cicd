# ✅ Build Stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ✅ Production Stage (Nginx)
FROM nginx:alpine

# ✅ Copy React build
COPY --from=build /app/dist /usr/share/nginx/html

# ✅ Copy SPA routing config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
