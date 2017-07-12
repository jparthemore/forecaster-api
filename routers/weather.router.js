/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();

const darksky = process.env.DARKSKY || require('../credentials').darkskykey;
const geocoder = process.env.GEOCODER || require('../credentials').geocoderkey;

const baseDarkSkyUrl = `https://api.darksky.net/forecast/${darksky}/`;
//https://api.darksky.net/forecast/a2227f6b9666077591e3d5a1021e5b25/37.8267,-122.4233

const baseGeocoderUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${geocoder}&address=`;
//const baseGeocoderUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=Gainesville,+FL&key=AIzaSyAiVQp8VR5HMhDlEtI94WErFqWr_Sn4qvQ';

const axios = require('axios');

router.get('/weather',(request,response,next)=>{
  const url = `${baseDarkSkyUrl}29,-82`;
  axios.get(url)
    .then(weather =>{
      response.json(weather.data);
    })
    .catch(err=>{
      next(err);
    });
  //response.send('weather with no params');
});


router.get('/weather/:lat,:lng',(request,response,next)=>{
  const lat = request.params.lat;
  const lng = request.params.lng;
  const url = `${baseDarkSkyUrl}${lat},${lng}`;
  axios.get(url)
    .then(weather=>{
        response.json(weather.data);
    })
    .catch(err=>{
      next(err);
    });
  //response.send('weather w/latitude and longitude');
});
router.get('/weather/location/:location',(request,response,next)=>{
  const loc = request.params.location;
  const locUrl = `${baseGeocoderUrl}${loc}`;

  axios.get(locUrl)
  .then(geocoder=>{
    const lat = geocoder.data.results[0].geometry.location.lat;
    const lng = geocoder.data.results[0].geometry.location.lng;
      //response.json(geocoder.data.results[0].geometry.location);
      return(`${baseDarkSkyUrl}${lat},${lng}`);
  })
  .then(url=>{
    axios.get(url)
      .then(weather=>{
          response.json(weather.data);
      })
      .catch(err=>{
        next(err);
      });
  })
  .catch(err=>{
    next(err);
  });

  //response.send('weather by physical location');
});

module.exports = router;
