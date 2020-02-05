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

router.get('/:mode', function(req, res, next) {

  var mode = req.param("mode");

  influx.query("select last(temperature) as temperature, last(humidity) as humidity, last(luminosity) as luminosity, last(pressure) as pressure from weather where sensor='" + mode + "'").then(results => {
    res.send(results);
  });
});

// fill(0) à la fin de la requête pour les valeurs par défaut ne fonctionne pas : https://github.com/influxdata/influxdb/issues/6967

module.exports = router;
