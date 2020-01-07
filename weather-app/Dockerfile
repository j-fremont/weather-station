FROM alpine:3.7

RUN apk update && apk add nodejs

WORKDIR /usr/src/app

COPY ./weather-app ./

RUN npm install

EXPOSE 3000

CMD [ "npm", "run dev" ]

