FROM node:12-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
CMD ["node", "src/index.js"]


# to run docker using bind mounts
# docker run -dp 3000:3000 \
# -w /app -v "$(pwd):/app" \
# node:12-alpine \
# sh -c "yarn install && yarn run dev"


# to run docker mysql db on network
# docker run -d \
# --network todo-app --network-alias mysql \
# -v todo-mysql-data:/var/lib/mysql \
# -e MYSQL_ROOT_PASSWORD=secret \
# -e MYSQL_DATABASE=todos
# mysql:5.7