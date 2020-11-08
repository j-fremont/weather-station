FROM arm32v7/alpine:latest

RUN apk update && apk add gettext mosquitto-clients bc

WORKDIR /scripts

ADD ./scripts .

CMD ["./entrypoint.sh"]
#CMD tail -f /dev/null
