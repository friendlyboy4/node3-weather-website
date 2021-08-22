const request = require('postman-request')

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c229ec89394324617d47631196c99109&query=${long}, ${lat}`
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Error: could not connect to weather API', undefined)
    } else if (body.error) {
      callback(`Error: ${body.error.info}`, undefined)
    } else {
      const data = body.current
      callback(undefined, `It is currently ${data.temperature} degrees and ${data.weather_descriptions} in ${body.location.name}`)
    } 
  })
}

module.exports = forecast