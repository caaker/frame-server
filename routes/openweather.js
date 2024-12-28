// enhancements to GPT - removed axios, added env variable for api_key
// moved to use lat/long, added router, removed property filtering
// me - renamed variables
// (18.9°C × 9/5) + 32 = 66.02°F


const express = require('express');
const http = require('http');
const router = express.Router();
const api_key = process.env.OPEN_WEATHER;

router.get('/', (req, res) => {

  const lat = req.query.lat;
  const lon = req.query.lon;
  const path1 = `/data/2.5/weather?lat=${ lat }&lon=${ lon }&appid=${ api_key }&units=metric`;

  console.log(path1);

  const options = {
    hostname: 'api.openweathermap.org',
    path: path1,
    method: 'GET'
  };

  const request = http.request(options, (response) => {
    let data_all = '';
    response.on('data', (data_chunk) => {
      data_all += data_chunk;
    });
    response.on('end', () => {
      res.send(JSON.parse(data_all));
    });
  });

  request.on('error', (error) => {
    console.error(error);
    res.status(500).send('An error occurred');
  });

  request.end();

});

module.exports = router;
