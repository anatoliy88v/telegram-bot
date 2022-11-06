let { createClient } = require('pexels')
let Jimp = require('jimp')

let WikiFakt = require('wikifakt')

async function generateImage(imagePath) {
  let fact = await WikiFakt.getRandomFact().then(function(generatedFact) {
    return generatedFact;
  });
  let photo = await getRandomImage(fact)
  await editImage(photo, imagePath, fact)
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRandomImage(animal) {
  try {
    const client = createClient(process.env.PEXELS_API_KEY)
    const query = animal
    let image

    await client.photos.search({ query, per_page: 10 }).then(res => {
      let images = res.photos
      image = images[randomInteger(0, (images.length - 1))]
    })

    return image
  } catch (error) {
    console.log('error downloading image', error)
    getRandomImage(animal)
  }
}

async function editImage(image, imagePath, fact) {
  try {
    let imgURL = image.src.medium
    let animalImage = await Jimp.read(imgURL).catch(error => console.log('error ', error))
    let animalImageWidth = animalImage.bitmap.width
    let animalImageHeight = animalImage.bitmap.height
    let imgDarkener = new Jimp(animalImageWidth, animalImageHeight, '#000000')
    imgDarkener = imgDarkener.opacity(0.5)
    animalImage = await animalImage.composite(imgDarkener, 0, 0);
    let posX = animalImageWidth / 15
    let posY = animalImageHeight / 15
    let maxWidth = animalImageWidth - (posX * 2)
    let maxHeight = animalImageHeight - posY
    let font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE)

    await animalImage.print(font, posX, posY, {
      text: fact,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, maxWidth, maxHeight)

    await animalImage.writeAsync(imagePath)

    console.log("Image generated successfully")
  } catch (error) {
    console.log("error editing image", error)
  } 
}

module.exports = { generateImage }
