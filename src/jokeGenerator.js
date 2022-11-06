async function generateJoke() {
  try {
    const response = await fetch(process.env.JOKE_API_URL, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data.joke;
  } catch (error) {
    console.log('error generating a joke', error)
  }
}

module.exports = { generateJoke }
