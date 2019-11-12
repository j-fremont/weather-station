
var config = module.exports = {};

config.influxdb = {
  host: 'dadi.pleiade.edf.fr'
};

config.mqtt = {
  host: 'dadi.pleiade.edf.fr',
  port: 1883
};

config.server = {
  host: 'localhost',
  port: 9000
};

config.interval = {
  emit: 600000, // In ms, between two emissions of the last measurements, from server to clients, through web socket.
  query: 10000 // In ms, between two queries in InfluxDB, for the chart update in the clients. 
};

// In ms, between two measurements stored directly in InfluxDB => see Arduino code.
  
