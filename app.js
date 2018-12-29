'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const cfenv = require('cfenv')

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN_DEV,
  channelSecret: process.env.CHANNEL_SECRET_DEV,
};

const appEnv = cfenv.getAppEnv()
let baseURL = appEnv.url;

const client = new line.Client(config);
const app = express();

import * from "./services/linebot";

// serve static and downloaded files
app.use('/static', express.static('static'));
app.use('/downloaded', express.static('downloaded'));

app.get('/callback', (req, res) => res.end(`I'm listening. Please access with POST.`));

// webhook callback
app.post('/callback', line.middleware(config), (req, res) => {
  if (req.body.destination) {
    console.log("Destination User ID: " + req.body.destination);
  }

  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }

  // handle events separately
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});


const port = appEnv.port || 3000
app.listen(port, () => console.log(`listening on ${baseURL}:${port}/callback`));

// module.exports = require('./services/movie.js')
