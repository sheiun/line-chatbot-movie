'use strict';

const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const assistant = new AssistantV1({
  version: '2018-09-20',
  iam_apikey: 'uWyAZfbl_GA85v_qmzTKVWTJ3GfCqPqlrLyNyqhjf3wP',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});

const database = require('./database')

const callAssistant = (text, userId) => {
  return new Promise((resolve, reject) => {
    let data = {
      workspace_id: '38da265a-084d-40e8-8d87-6ff1cfe537f5', // Movie
      input: { 'text': text },
      context: database.getUser(userId).context
    }
    if (!data.context) delete data.context
    assistant.message(data, (err, resp) => {
      if (err){
        reject(err)}
      else {
        database.updateUser(userId, resp.context)
        resolve(resp)
      }
    });
  })
};

module.exports = { callAssistant };