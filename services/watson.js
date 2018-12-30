'use strict';

const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const assistant = new AssistantV1({
  version: '2018-09-20',
  iam_apikey: 'uWyAZfbl_GA85v_qmzTKVWTJ3GfCqPqlrLyNyqhjf3wP',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});

var user_context = {}; /* userId: context */

const callAssistant = (text, context = {}) => {
  return new Promise((resolve, reject) => {
    assistant.message({
      workspace_id: '38da265a-084d-40e8-8d87-6ff1cfe537f5', // Movie
      input: { 'text': text },
      context: context
    }, (err, resp) => {
      if (err)
        reject(err)
      else
        resolve(resp);
    });
  })
};

module.exports = { callAssistant, user_context };

var con;
callAssistant('我想看電影')
  .then(v => {
    console.log(JSON.stringify(v, null, 2))
    con = v.context
  })
  .then(x =>
    callAssistant('樹林秀泰', con)
      .then(v => { console.log(JSON.stringify(v, null, 2)) })
  )
  // .then(x => console.log(con))
