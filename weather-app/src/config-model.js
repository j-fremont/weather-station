
var config = module.exports = {};

config.influxdb = {
  host: '${INFLUXDB_HOST}'
};

config.mqtt = {
  host: '${MQTT_HOST}',
  port: 1883
};

config.server = {
  host: '${NODEJS_HOST}',
  port: 9000
};

config.interval = {
  query: 1800000 // In ms, between two queries in InfluxDB, for the chart update in the clients.
};

// In ms, between two measurements stored directly in InfluxDB => see Arduino code.
