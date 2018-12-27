'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const cfenv = require('cfenv')

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);
const app = express();

app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});


function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const echo = { type: 'text', text: event.message.text };

  return client.replyMessage(event.replyToken, echo);
}

const appEnv = cfenv.getAppEnv()

app.listen(appEnv.port, '0.0.0.0', () => console.log("server starting on " + appEnv.url))

// module.exports = require('./services/movie.js')
