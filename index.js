const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

const { Configuration, OpenAIApi } = require('openai');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
const port = process.env.PORT;
const configuration = new Configuration({
  organization: process.env.OPEN_AI_ORG_KEY,
  apiKey: process.env.OPEN_AI_TOKEN,
});

const openai = new OpenAIApi(configuration);

//create a simple express api that calls the function above
app.post('/', async (req, res) => {
  const { messages, currentModel } = req.body;

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
