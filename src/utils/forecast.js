const request = require('request');

const forecast = (coordinates, callback) => {

    var url = 'http://api.weatherstack.com/current?access_key=995760078a50b2f8b1f7445b04b61a76&units=f&query=' + coordinates;

    request({ url, json: true }, (error, response) => {

        if (error) {
    
            console.log('Unable to connect to weather service');
            callback(error);
    
        } else {

            const { temperature, feelslike, precip, wind_speed } = response.body.current;

            const report = `It is ${temperature}-degrees outside. It feels like ${feelslike}-degrees outside. The windspeed is ${wind_speed} mph. there is a ${precip}% chance of rain.`; 

            callback(error, report);
        }
    
    });

};

module.exports = forecast;