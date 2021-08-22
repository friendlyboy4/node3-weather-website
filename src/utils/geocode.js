const request = require('postman-request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoiam9lbHJvc2VuenZlaWciLCJhIjoiY2tzMGJnNHllMWlsMTJ1cWVuemlyOTZkciJ9.hJ5g1alU8sXaf5Q6qrYZKQ&limit=1`

  request({ url, json:true }, (error, { body }) => {
    if (error) {
      callback('Error: unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      callback('Error: unable to find location - please try another search', undefined)
    } 
    else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        loc: body.features[0].place_name
    })
    }
  })
}

module.exports = geocode