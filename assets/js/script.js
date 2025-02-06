document.onload(getWeather());

async function getWeather() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=34.7209728&longitude=-92.3271168&hourly=temperature_2m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const currentHour = new Date().getHours();
    const temperature = data.hourly.temperature_2m[currentHour];

    console.log(`Current temperature: ${temperature}°F`);

    const weatherElement = document.getElementById("weather");
    if (weatherElement) {
      weatherElement.textContent = `Current temperature: ${temperature}°F`;
    }

    return temperature;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
