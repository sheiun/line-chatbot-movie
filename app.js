'use strict';

const cfenv = require('cfenv')
const appEnv = cfenv.getAppEnv();
let baseURL = appEnv.url;

const express = require('express');
const app = express();

const linebot = require('./services/linebot');
const devLinebot = require('./services/devLinebot')

app.use('/static', express.static('static'));
app.use('/downloaded', express.static('downloaded'));

app.get('/callback', (req, res) => res.end(`I'm listening. Please access with POST.`));

app.post('/callback', linebot.channelConfig, (req, res) => {
  if (req.body.destination) {
    console.log("Destination User ID: " + req.body.destination);
  }

  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }

  Promise.all(req.body.events.map(linebot.handleEvent))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.post('/dev/callback', devLinebot.channelConfig, (req, res) => {
  if (req.body.destination) {
    console.log("Destination User ID: " + req.body.destination);
  }

  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }

  Promise.all(req.body.events.map(devLinebot.handleEvent))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

const port = appEnv.port || 3000
app.listen(port, () => console.log(`listening on ${baseURL}:${port}/callback`));
