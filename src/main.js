const express = require('express');
const WU_API_KEY = require('./wu-api-key');
const WU = require('./weather-underground').withKey(WU_API_KEY);

const STATIC_ROOT = __dirname + '/../app';

function extractWeatherData(data) {
  const d = data.current_observation;
  return {
    city: d.display_location.full,
    weather: d.weather,
    temperature: d.temp_f,
    wind: d.wind_mph,
    icon: d.icon
  };
}

express()
  .use('/app', express.static(STATIC_ROOT))
  .get('/', (req, res) => {
    res.sendFile('index.html', {root: STATIC_ROOT});
  })
  .get('/weather/:zip', (req, res) => {
    const zip = req.params.zip;
    const result = validators.zip(zip);
    if (result[0]) {
      WU.weather(result[1])
        .then(extractWeatherData)
        .then(data => res.send(data))
        .catch(err => res.sendStatus(500));
    } else {
      res.status(400).send({message: result[1]});
    }
  })
  .listen(3000, () => {
    console.log('Weather Diff listening on http://localhost:3000!');
  });
