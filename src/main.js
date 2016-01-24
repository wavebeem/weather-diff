const express = require('express');
const routes = require('./routes');

const port = Number(process.env.PORT) || 3000;

function greet() {
  console.log('Weather Diff listening on http://localhost:' + port);
}

express()
  .use('/app', routes.Static)
  .get('/', routes.Index)
  .get('/weather/:zip', routes.Weather)
  .listen(port, greet);
