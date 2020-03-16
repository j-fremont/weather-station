#!/bin/sh

#MOSQUITTO_HOST=localhost
MOSQUITTO_HOST=${MOSQUITTO_HOST}

SCALE=1 # Number of digits for floats

temperature_inside=190 # Starts with 19.0 °C
temperature_outside=100 # Starts with 10.0 °C
humidity_inside=750 # Starts with 75%
humidity_outside=850 # Starts with 85%
pressure_outside=10000 # Starts with 1000 hPa
luminosity_outside=500 # Starts with 50%

variation() {
  r=$RANDOM # Integer in the range 0 - 32767
  let "r %= 10" # Modulo 10 : integer in the range 0 - 9
  echo $r
}

orientation() {
  r=$RANDOM # Integer in the range 0 - 32767
  if [[ $r -lt 16383 ]] # 32767 / 2
  then
    echo "down"
  else
    echo "up"
  fi
}

change_value() {
  value=$1
  v=$(variation)
  o=$(orientation)
  if [ "$o" = "up" ]; then
    let "value += $v"
  else
    let "value -= $v"
  fi
  echo $value
}

send_value() {
  topic=$1
  sensor=$2
  value=$3
  new_value=$(change_value $value)
  echo $new_value # Pass new value from the current subshell $(send_value...) to the calling shell
  formatted_value=$(echo "scale=$SCALE; $new_value/10" | bc -l | awk '{printf "%.1f\n", $0}')
  message="{\"sensor\":\"$sensor\",\"value\":$formatted_value}"
  mosquitto_pub -h $MOSQUITTO_HOST -t $topic -m $message
}

while :
do

  temperature_inside=$(send_value "temperature" "inside" $temperature_inside)
  temperature_outside=$(send_value "temperature" "outside" $temperature_outside)
  humidity_inside=$(send_value "humidity" "inside" $humidity_inside)
  humidity_outside=$(send_value "humidity" "outside" $humidity_outside)
  pressure_outside=$(send_value "pressure" "outside" $pressure_outside)
  luminosity_outside=$(send_value "luminosity" "outside" $luminosity_outside)

  sleep 600

done
