FROM node:alpine

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --production
COPY ./ ./

CMD ["npm", "start"]