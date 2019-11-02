
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
  emit: 600000, // In ms, between two emissions of the last measurements, from server to clients, through web socket.
  query: 1800000 // In ms, between two queries in InfluxDB, for the chart update in the clients. 
};
  