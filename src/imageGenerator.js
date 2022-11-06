const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
let Jimp = require('jimp')

async function getImage(imagePath, description) {
  try {
    const response = await openai.createImage({
      prompt: `${description}`,
      n: 1,
      size: "1024x1024",
    });
    const imageUrl = response.data.data[0].url;

    let catImage = await Jimp.read(imageUrl).catch(error => console.log('error ', error))
    await catImage.writeAsync(imagePath)
  } catch (error) {
    console.log('error getting cat image', error)
  }
}

module.exports = { getImage }
