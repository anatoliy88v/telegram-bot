const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getAnswer(question) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `${question}`,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log('error getting answer info', error)
  }
}

async function getRecipe(ingredients) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `${ingredients} Instructions:`,
      temperature: 0.3,
      max_tokens: 120,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log('error getting answer info', error)
  }
}

async function getHorror(topic) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Topic: ${topic} Two-Sentence Horror Story:`,
      temperature: 0.8,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log('error getting answer info', error)
  }
}

module.exports = { getAnswer, getRecipe, getHorror }
