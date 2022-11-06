const { Telegraf } = require('telegraf')
const { v4: uuidV4 } = require('uuid')
require('dotenv').config()
let factGenerator = require('./src/factGenerator')
let jokeGenerator = require('./src/jokeGenerator')
let weatherInfo = require('./src/weatherInfo')
let questionReply = require('./src/questionReply')
let catGeneratror = require('./src/catGeneratror')
// TODO convert to save gif end send it
let getYesOrNo = require('./src/yesNo')
let imageGenerator = require('./src/imageGenerator')
let helpers = require('./src/helpers')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
  let message = `Please use the /fact command to receive a new fact.\nPlease use the /joke command to receive a new joke.\nPlease use the /weather 'city_name' command to get weather info.\nPlease use the /ask 'question' command to get answer.\nPlease use the /ask_recipe 'list of ingredients' command to get recipe.\nPlease use the /horror 'topic' command to get two sentance of horror story.\nPlease use the /cat command to receive cat photo.\nPlease use the /yesno command to get gif answer.\nPlease use the /image 'optional_description' command to generate image.`
  ctx.reply(message)
})

bot.command('fact', async (ctx) => {
  try {
    ctx.reply('Generating image, Please wait !!!')
    let imagePath = `./temp/${uuidV4()}.jpg`
    await factGenerator.generateImage(imagePath)
    await ctx.replyWithPhoto({ source: imagePath })
    helpers.deleteImage(imagePath)
  } catch (error) {
    console.log('error', error)
    ctx.reply('error sending image')
  }
})

bot.command('joke', async (ctx) => {
  try {
    const joke = await jokeGenerator.generateJoke()
    await ctx.reply(`${joke}`)
  } catch (error) {
    console.log('error', error)
  }
})

bot.command('weather', async (ctx) => {
  try {
    const city = ctx.message.text.split(' ').pop();
    const weather = await weatherInfo.getWeather(city)
    await ctx.reply(`${weather}`)
  } catch (error) {
    console.log('error', error)
  }
})

bot.command('ask', async (ctx) => {
  try {
    const text = ctx.message.text;
    const question = text.substring(text.indexOf(' ') + 1);
    const answer = await questionReply.getRecipe(question)
    await ctx.reply(`${answer}`)
  } catch (error) {
    console.log('error', error)
  }
})

bot.command('ask_recipe', async (ctx) => {
  try {
    const text = ctx.message.text;
    const ingredients = text.substring(text.indexOf(' ') + 1);
    const recipe = await questionReply.getRecipe(ingredients)
    await ctx.reply(`${recipe}`)
  } catch (error) {
    console.log('error', error)
  }
})

bot.command('horror', async (ctx) => {
  try {
    const text = ctx.message.text;
    const topic = text.substring(text.indexOf(' ') + 1);
    const story = await questionReply.getHorror(topic)
    await ctx.reply(`${story}`)
  } catch (error) {
    console.log('error', error)
  }
})

bot.command('cat', async (ctx) => {
  try {
    ctx.reply('Generating cat, Please wait !!!')
    let imagePath = `./temp/${uuidV4()}.jpg`
    await catGeneratror.getCat(imagePath)
    await ctx.replyWithPhoto({ source: imagePath })
    helpers.deleteImage(imagePath)
  } catch (error) {
    console.log('error', error)
  }
})

bot.command('image', async (ctx) => {
  try {
    ctx.reply('Generating image, Please wait !!!')
    let imagePath = `./temp/${uuidV4()}.jpg`
    const text = ctx.message.text;
    const description = text.substring(text.indexOf(' ') + 1);
    await imageGenerator.getImage(imagePath, description)
    await ctx.replyWithPhoto({ source: imagePath })
    helpers.deleteImage(imagePath)
  } catch (error) {
    console.log('error', error)
  }
})

bot.command('yesno', async (ctx) => {
  try {
    ctx.reply('Generating answer, Please wait !!!')
    const answer = await getYesOrNo.getAnswer()
    await ctx.reply(`${answer}`)
  } catch (error) {
    console.log('error', error)
  }
})

bot.hears(/hey/, (ctx) => ctx.reply('Hey there'));
bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.launch()