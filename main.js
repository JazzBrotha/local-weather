// jshint esversion:6

(function displayHTML () {

  //HTML elements
  const infoContainer = document.getElementById('info-container');
  const cityInfo = document.getElementById('city-info');
  const weatherInfo = document.getElementById('weather-info');
  const tempInfo = document.getElementById('temperature-info');
  const weatherIcon = document.getElementById('weather-icon');
  const img = document.createElement('img');

  //Promise return from async function
  let weatherPromise = getWeather();

  //Handle weather promise
  weatherPromise.then(data => {
    let weather,location,temp,icon,iconUrl;
    weather = data.weather[0].main;
    location = data.name;
    temp = data.main.temp;
    icon = data.weather[0].icon;
    iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

    //Page layout
    weatherInfo.innerHTML = weather;
    cityInfo.innerHTML = location;
    tempInfo.innerHTML = `${Math.round(temp)}&#176C`;
    weatherIcon.appendChild(img);
    img.src = iconUrl;

    //Tempswitch between C and F
    tempInfo.onclick = () => {
      if (tempInfo.innerHTML[tempInfo.innerHTML.length - 1] === 'C')
        tempInfo.innerHTML = `${Math.round(temp*9/5+32)}&#176F`;
      else
        tempInfo.innerHTML = `${Math.round(temp)}&#176C`;
      };
  });

  //Inform user of error
  weatherPromise.catch( () => {
    infoContainer.innerHTML = `Sorry, the weather for your location could not be displayed.`;
  });

})();
