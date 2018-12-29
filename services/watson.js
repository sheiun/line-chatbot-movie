const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const assistant = new AssistantV1({
  version: '2018-09-20',
  iam_apikey: 'uWyAZfbl_GA85v_qmzTKVWTJ3GfCqPqlrLyNyqhjf3wP',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});

const callAssistant = (text, conversation_id = null) => {
  return new Promise((resolve, reject) => {
    assistant.message({
      workspace_id: '38da265a-084d-40e8-8d87-6ff1cfe537f5', // Movie
      input: { 'text': text },
      context: { 'conversation_id': conversation_id }
    }, (err, resp) => {
      if (err)
        reject(err)
      else
        resolve(resp);
    });
  })
}

module.exports = { callAssistant };