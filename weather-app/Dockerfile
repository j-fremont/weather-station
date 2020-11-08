FROM arm32v7/alpine:latest

RUN apk update && apk add nodejs npm gettext

WORKDIR /usr/src/app

COPY ./ ./

RUN npm install

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "start.sh"]

