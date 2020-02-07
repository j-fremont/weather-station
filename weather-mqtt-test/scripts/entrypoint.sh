#!/bin/sh

# Try sponge : envsubst < mosquitto-pub.sh | sponge > mosquitto-pub.sh

envsubst '$MOSQUITTO_HOST' < mosquitto-pub_template.sh > mosquitto-pub.sh

chmod +x mosquitto-pub.sh

./mosquitto-pub.sh

