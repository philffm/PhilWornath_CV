// Assuming the use of fetch API for network requests
export const API_KEY_WEATHER = '79e426a88a82a92f97b3758741d3d619';

export async function fetchWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY_WEATHER}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather data fetch failed');
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null; // Or handle the error as appropriate for your application
  }
}

export async function loadWeather(cityName) {
  const weatherData = await fetchWeather(cityName);
  if (weatherData) {
    // Process and display weather data
    console.log(weatherData);
    // Additional logic to display the weather information in your application's UI
  }
}
