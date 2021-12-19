const request = require('request')

const forecast = (latitude, longitude, callback) => {
const url =  'http://api.weatherstack.com/current?access_key=9c3792ce9f1588f7531b199c12ed36a7&query=' + latitude + ',' + longitude + '&units=f'

request({url, json: true}, (error, { body }) => {
if (error) {
callback('Unable to connect to weather service!', undefined)
} else if (body.error) {
callback('Unable to find location', undefined)
} else {
callback(undefined, body.current.weather_descriptions[0] + ". it is currently "  + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " % chance of rain.")
}
})
    
}

module.exports = forecast 