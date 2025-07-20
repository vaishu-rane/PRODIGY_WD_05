const API_KEY = 'YOUR_API_KEY';

async function getWeather() {
  const city = document.getElementById('cityInput').value || 'Mumbai';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('location').textContent = data.name;
    document.getElementById('high').textContent = Math.round(data.main.temp_max);
    document.getElementById('low').textContent = Math.round(data.main.temp_min);
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    displayForecast(forecastData);
  } catch (error) {
    alert('City not found. Please try again.');
  }
}

function displayForecast(data) {
  const forecastContainer = document.getElementById('forecast');
  forecastContainer.innerHTML = '';

  const forecast = data.list.filter((item, index) => index % 8 === 0);

  forecast.forEach((hour) => {
    const item = document.createElement('div');
    item.classList.add('forecast-item');
    item.innerHTML = `
      <p>${new Date(hour.dt_txt).getHours()}:00</p>
      <img src="https://openweathermap.org/img/wn/${hour.weather[0].icon}.png" alt="icon" width="40" />
      <p>${Math.round(hour.main.temp)}°C</p>
    `;
    forecastContainer.appendChild(item);
  });
}

window.onload = getWeather;
