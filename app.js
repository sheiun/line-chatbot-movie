import express from 'express'

var cfenv = require('cfenv')

const app = express()

app.use(express.static(__dirname + '/public'))

var appEnv = cfenv.getAppEnv()

app.listen(appEnv.port, '0.0.0.0', () => console.log("server starting on " + appEnv.url))
