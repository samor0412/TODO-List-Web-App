FROM node:18-alpine

WORKDIR /apps
COPY ./packages/backend/package.json ./packages/backend/package.json
COPY ./packages/backend/src/infras/prisma/schema.prisma ./packages/backend/src/infras/prisma/schema.prisma
COPY ./package*.json ./
RUN npm ci && \
    npm ci -w backend && \
    npm run -w backend generate:prisma

COPY ./packages/backend/* ./packages/backend

CMD [ "npm", "-w", "backend", "start" ]