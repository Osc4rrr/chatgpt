const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3080;
const { Configuration, OpenAIApi } = require('openai');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const configuration = new Configuration({
  organization: 'org-CmNDULl3Qv8jKJH7ifaLdasJ',
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

//create a simple express api that calls the function above
app.post('/', async (req, res) => {
  const { messages, currentModel } = req.body;

  console.log(messages);
  console.log(currentModel);
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `${messages}`,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.json({
    message: response.data.choices[0].text,
  });
});

app.get('/models', async (req, res) => {
  const response = await openai.listEngines();
  res.json({
    models: response.data.data,
  });
});

app.listen(port, () => {
  console.log('server running on port ' + port);
});
