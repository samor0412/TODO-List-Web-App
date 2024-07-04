FROM node:18-alpine as builder

WORKDIR /apps
COPY ./packages/frontend/package.json ./packages/frontend/package.json
COPY ./package*.json ./
RUN npm ci && \
    npm ci -w frontend
COPY ./packages/frontend ./packages/frontend
RUN npm run -w frontend build

# Use the official Nginx image
FROM nginx:alpine
COPY --from=builder /apps/packages/frontend/dist /usr/share/nginx/html
COPY --from=builder /apps/packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]