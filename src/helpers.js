const fs = require('fs')

const deleteImage = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err) {
      return
    }
    console.log('file deleted')
  })
}

module.exports = { deleteImage }