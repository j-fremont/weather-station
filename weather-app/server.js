const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mqtt = require('mqtt');
const Influx = require('influx');

var last_temperature=0, last_humidity=0, last_luminosity=0;

/*
 * Schéma InfluxDB
 *
 */

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'homedb',
  schema: [{
    measurement: 'weather',
    fields: {
       temperature: Influx.FieldType.FLOAT,
       humidity: Influx.FieldType.FLOAT,
       luminosity: Influx.FieldType.FLOAT
    },
    tags: ['sensor']
  }]
});

/*
const influx_temperature = new Influx.InfluxDB({
  host: 'localhost',
  database: 'homedb',
  schema: [{
    measurement: 'temperature',
    fields: {
       value: Influx.FieldType.FLOAT
    },
    tags: ['sensor']
  }]
});

const influx_humidity = new Influx.InfluxDB({
  host: 'localhost',
  database: 'homedb',
  schema: [{
    measurement: 'humidity',
    fields: {
       value: Influx.FieldType.FLOAT
    },
    tags: ['sensor']
  }]
});

const influx_luminosity = new Influx.InfluxDB({
  host: 'localhost',
  database: 'homedb',
  schema: [{
    measurement: 'luminosity',
    fields: {
       value: Influx.FieldType.FLOAT
    },
    tags: ['sensor']
  }]
});
*/

/*
 * Clients MQTT
 *
 */

var client = mqtt.connect('mqtt://192.168.1.10:1883');

client.on('connect', () => {

  console.log('connect');

  client.subscribe('temperature');
  client.subscribe('humidity');
  client.subscribe('luminosity');
});

client.on('message', (topic, message) => {

  console.log('message from topic ' + topic + ' - message : ' + message);

  if (topic==='temperature') {
    last_temperature=parseFloat(message).toFixed(1).toString();
    influx.writePoints([{
      measurement: 'weather',
      tags: { sensor:'inside' },
      fields: {
        temperature: last_temperature
      }
    }]);
    /*
    influx_temperature.writePoints([{
      measurement: 'temperature',
      tags: { sensor:'room1' },
      fields: { value: last_temperature }
    }]);*/
  }
  else if (topic==='humidity') {
    last_humidity=parseFloat(message).toFixed(1).toString()
    influx.writePoints([{
      measurement: 'weather',
      tags: { sensor:'inside' },
      fields: {
        humidity: last_humidity
      }
    }]);
    /*
    influx_humidity.writePoints([{
      measurement: 'humidity',
      tags: { sensor:'room1' },
      fields: { value: last_humidity }
    }]);*/
  }
  else if (topic==='luminosity') {
    last_luminosity=parseFloat(message).toFixed(1).toString()
    influx.writePoints([{
      measurement: 'weather',
      tags: { sensor:'inside' },
      fields: {
        luminosity: last_luminosity
      }
    }]);
    /*
    influx_luminosity.writePoints([{
      measurement: 'luminosity',
      tags: { sensor:'room1' },
      fields: { value: last_luminosity }
    }]);*/
  }
});

/*
setInterval(() => {
  influx.writePoints([{
    measurement: 'weather',
    fields: {
      temperature: last_temperature,
      humidity: last_humidity,
      luminosity: last_luminosity
    },
    tags: {
      sensor:'room1'
    }
  }]);
//}, 600000); // 10 minutes
}, 10000); // 10 secondes
*/

/*
 * Serveur web sockets
 *
 */

io.on('connection', socket => {

  console.log('connection web socket');

  setInterval(() => {
    socket.emit('sock_temperature', last_temperature);
    socket.emit('sock_humidity', last_humidity);
    socket.emit('sock_luminosity', last_luminosity);
  }, 10000);

});

http.listen(9000, () => {
  console.log('listening on *:9000');
});
