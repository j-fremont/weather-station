
var config = module.exports = {};

config.influxdb = {
  host: 'localhost'
};

config.mqtt = {
  host: '192.168.1.10',
  port: 1883
};

config.server = {
  host: 'localhost',
  port: 9000
};

config.interval = {
  query: 1800000 // In ms, between two queries in InfluxDB, for the chart update in the clients.
};

// In ms, between two measurements stored directly in InfluxDB => see Arduino code.
