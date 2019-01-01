'use strict';

const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const assistant = new AssistantV1({
  version: '2018-09-20',
  iam_apikey: 'uWyAZfbl_GA85v_qmzTKVWTJ3GfCqPqlrLyNyqhjf3wP',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});

var user_context = {}; /* userId: context */

const callAssistant = (text, userId) => {
  return new Promise((resolve, reject) => {
    let data = {
      workspace_id: '38da265a-084d-40e8-8d87-6ff1cfe537f5', // Movie
      input: { 'text': text },
      context: user_context[userId]
    }
    if (!data.context) delete data.context
    assistant.message(data, (err, resp) => {
      if (err)
        reject(err)
      else
        // test below lines can resolve
        user_context[userId] = resp.context
        resolve(resp);
    });
  })
};

module.exports = { callAssistant, user_context };

// var con;
// callAssistant('我想看電影')
//   .then(v => {
//     console.log(JSON.stringify(v, null, 2))
//     con = v.context
//   })
//   .then(x =>
//     callAssistant('樹林秀泰', con)
//       .then(v => { console.log(JSON.stringify(v, null, 2)) })
//   )
  // .then(x => console.log(con))
