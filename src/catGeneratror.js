let Jimp = require('jimp')

async function getCat(imagePath) {
  try {
    const query ='http://thecatapi.com/api/images/get?size=med';
    const response = await fetch(query, {
      headers: {
        Accept: "application/json",
      },
    });
    let catImage = await Jimp.read(response.url).catch(error => console.log('error ', error))
    await catImage.writeAsync(imagePath)
  } catch (error) {
    console.log('error getting cat image', error)
  }
}

module.exports = { getCat }
