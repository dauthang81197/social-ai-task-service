FROM node:18-alpine

WORKDIR /app

COPY ./dist ./dist
COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile && yarn cache clean

EXPOSE 8081

CMD ["yarn", "start:prod"]
