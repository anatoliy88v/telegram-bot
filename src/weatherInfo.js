async function getWeather(city) {
  try {
    const apiKey = process.env.WEATHER_API_KEY
    const query =`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(query, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    const dataInfo = `Weather for ${city}:\nDescription: ${data.weather[0].description}\nTemperature: ${data.main.temp}\nHumidity: ${data.main.humidity}\nWind: ${data.wind.speed}`
    return dataInfo;
  } catch (error) {
    console.log('error getting weather info', error)
  }
}

module.exports = { getWeather }
