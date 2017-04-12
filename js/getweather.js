//jshint esversion:6

async function getWeather () {
    try {

      //Get user location
      let city = await getLocation();

      //Get weather info
      let weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=183e1b1ca432817bcee811d5a817920d`);

      //Parse data
      let parsedWeather = await weather.json();

      return parsedWeather;

    }
    //Error handler
    catch (error) {
        console.log(`Could not get location: ${error}`);
    }
};
