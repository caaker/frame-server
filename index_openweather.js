


// (node:8753)
// ExperimentalWarning:
// The Fetch API is an experimental feature. This feature could change at any time

// Get the OpenWeather API key from the environment variables
const API_KEY = process.env.OPEN_WEATHER;

// Enter the latitude and longitude of the location you want to get weather data for
const latitude = '30.2644233';
const longitude = '-97.7343094';

// Create the URL for the OpenWeather API request
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ latitude }&lon=${ longitude }&appid=${ API_KEY }`;

// Send the API request and get the response
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Extract the weather data from the response
    const weatherData = data;

    // Print the weather data
    console.log(weatherData);
  })
  .catch(error => {
    console.log(error);
  });

