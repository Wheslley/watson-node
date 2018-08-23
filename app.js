const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); 
app.use(express.static('./public'));

const port = 3000;

const assistant = new AssistantV1({
  username: 'c37dcf7d-74c5-4c45-8f3a-aba4f68a9d03',
  password: 'Ot4iGQ2B6QUx',
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-08-22',
});

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id:'9149d7fc-b34f-4f85-9dd2-275eea637827',
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) res.status(500).json(err);

    res.json(response);
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));