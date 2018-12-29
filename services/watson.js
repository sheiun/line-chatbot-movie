var AssistantV1 = require('watson-developer-cloud/assistant/v1');

var assistant = new AssistantV1({
  version: '2018-09-20',
  iam_apikey: 'uWyAZfbl_GA85v_qmzTKVWTJ3GfCqPqlrLyNyqhjf3wP',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});

assistant.message({
  workspace_id: '38da265a-084d-40e8-8d87-6ff1cfe537f5',
  input: { 'text': '我想' }
}, (err, resp) => {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(resp, null, 2));
});