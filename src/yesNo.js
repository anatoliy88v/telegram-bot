async function getAnswer() {
  try {
    const query ='https://yesno.wtf/api/';
    const response = await fetch(query, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => response.json())
    .then(async (data) => data.image);
    return response;
  } catch (error) {
    console.log('error getting cat image', error)
  }
}

module.exports = { getAnswer }
