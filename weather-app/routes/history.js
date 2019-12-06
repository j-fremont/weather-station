'use strict';

const express = require('express');
const router = express.Router();
const Influx = require('influx');
const config = require('../src/config');

const influx = new Influx.InfluxDB({ // InfluxDB schema
  host: config.influxdb.host,
  database: 'homedb',
  schema: [{
    measurement: 'weather',
    fields: {
       temperature: Influx.FieldType.FLOAT,
       humidity: Influx.FieldType.FLOAT,
       luminosity: Influx.FieldType.FLOAT,
       pressure: Influx.FieldType.FLOAT
    },
    tags: ['sensor']
  }]
});

router.get('/:mode/:mean', function(req, res, next) {

  var mode = req.param("mode");
  var mean = req.param("mean");

  influx.query("select mean(temperature) as temperature, mean(humidity) as humidity, mean(luminosity) as luminosity, mean(pressure) as pressure from weather where sensor='" + mode + "' group by time(" + mean + ") fill(0) order by desc limit 48").then(results => {

    var points = [];

    results.reverse().map(result => {
      points = [...points,
        {
          temperature: result.temperature.toFixed(1),
          humidity: result.humidity.toFixed(1),
          luminosity: result.luminosity.toFixed(1),
          pressure: result.pressure.toFixed(1),
          datetime: result.time.toString().split(' GMT')[0]
        }
      ]
    });

    res.send(points);
  });
});

module.exports = router;
