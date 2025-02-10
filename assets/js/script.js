window.onload = getLocationAndWeather();

async function getLocationAndWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeather(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

async function getWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`;

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
