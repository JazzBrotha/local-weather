// jshint esversion:6

async function getLocation () {
    try {

        // Get user info
        let getInfo = await fetch('http://ipinfo.io/json');

        // Parse data
        let parsedInfo = await getInfo.json();

        //Save location
        let location = parsedInfo.city;

        return location;

    }
    
    //Error handler
    catch (error) {
        console.log(`Could not get weather information: ${error}`);
    }
};
