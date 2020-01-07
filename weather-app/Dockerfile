FROM alpine:3.7

RUN apk update && apk add nodejs && apk add gettext

WORKDIR /usr/src/app

COPY ./ ./

RUN npm install

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "start.sh"]

