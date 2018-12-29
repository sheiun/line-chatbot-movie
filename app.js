'use strict';

const cfenv = require('cfenv')
const appEnv = cfenv.getAppEnv()
let baseURL = appEnv.url;

const express = require('express');
const app = express();


app.use('/static', express.static('static'));
app.use('/downloaded', express.static('downloaded'));

app.get('/callback', (req, res) => res.end(`I'm listening. Please access with POST.`));

const port = appEnv.port || 3000
app.listen(port, () => console.log(`listening on ${baseURL}:${port}/callback`));

module.exports = app