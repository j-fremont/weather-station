FROM hypriot/rpi-alpine-scratch

RUN apk update && apk add nodejs gettext

WORKDIR /usr/src/app

COPY ./ ./

RUN npm install

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "start.sh"]

