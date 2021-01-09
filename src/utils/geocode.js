const request = require('request');

const mapbox = {};
mapbox.access_key = 'pk.eyJ1IjoibWJjb2xsaW5zMiIsImEiOiJja2pocTdyNnIzb3FrMnFwOTN2YzAxdnVuIn0.AyOdxnwEMmByqy3dgINlpw';
mapbox.base_url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/';



const geocode = (address, callback) => {

    mapbox.location = encodeURIComponent(address) + '.json';

    const {access_key, base_url, location} = mapbox;

    url = base_url + location + '?access_token=' + access_key;

    
  


    request({ url }, (error, response) => {

        if (error) {
    
            callback('Unable to connect to weather service', undefined);
    
        } else {
    
            const data = JSON.parse(response.body);
            const lat = JSON.stringify(data.features[0].center[1]);
            const lon = JSON.stringify(data.features[0].center[0]);
            coordinates = lat + ',' + lon;
        }

        callback(error, coordinates);
    
    });
};

module.exports = geocode;