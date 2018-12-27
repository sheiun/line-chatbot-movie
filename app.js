import express from 'express'

const cfenv = require('cfenv')

const app = express()

app.use(express.static(__dirname + '/public'))

const appEnv = cfenv.getAppEnv()

app.listen(appEnv.port, '0.0.0.0', () => console.log("server starting on " + appEnv.url))

// module.exports = require('./services/bot.js')
