FROM node:19.9.0
EXPOSE 3000

WORKDIR /app
COPY . .

RUN npm install -g npm@9.8.0
RUN yarn install
#RUN npm run docker:db:setup

CMD ["npm","start"]

