//jshint esversion:6
const cityInfo = document.getElementById('city-info');
const weatherInfo = document.getElementById('weather-info');
const tempInfo = document.getElementById('temperature-info');
const weatherIcon = document.getElementById('weather-icon');
const infoContainer = document.getElementById('info-container');

function getLocation() {
 fetch('http://ipinfo.io/json').then(response => {
    response.json().then(json => {
        const city = json.city;
        getWeather(city);
    });
  }).catch(function(err) {
    console.log(err);
    infoContainer.innerHTML = `Sorry, could not find your location.`;
});
}

function getWeather(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=183e1b1ca432817bcee811d5a817920d`).then(response => {
        response.json().then(json => {
            cityInfo.innerHTML = `${city}<br>`;
            weatherInfo.innerHTML = `${json.weather[0].main}<br>`;
            tempInfo.innerHTML = `${Math.round(json.main.temp)}&#176C`;
            tempInfo.onclick = () => {
                if (tempInfo.innerHTML[tempInfo.innerHTML.length - 1] === 'C')
                    tempInfo.innerHTML = `${(Math.round(json.main.temp)*9/5+32)}&#176F`;
                else tempInfo.innerHTML = `${Math.round(json.main.temp)}&#176C`;
            };
            iconSwitcher(json.weather[0].main);
        });
    }).catch(function(err) {
      console.log(err);
      infoContainer.innerHTML = `Sorry, the weather for your location could not be displayed.`;
  });
}

function iconSwitcher(currentWeather) {
    let weatherCase = currentWeather.toLowerCase();
    const img = document.createElement('img');
    img.className = 'weather-icon';
    weatherIcon.appendChild(img);
      switch (weatherCase) {
        case 'snow':
            img.src = 'icons/snow.svg';
            break;
        case 'rain':
            img.src = 'icons/rain.svg';
            break;
        case 'clouds':
            img.src = 'icons/cloudy.svg';
            break;
        case 'clear':
            img.src = 'icons/clear.svg';
            break;
        case 'drizzle':
            img.src = 'icons/thunder.svg';
            break;
        case 'thunderstorm':
            img.src = 'icons/drizzle.svg';
            break;
    }
}

getLocation();
