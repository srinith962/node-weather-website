const request = require('request')
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8c7b210198fa40325b38e6050c5f5a37&query=' + lat + ',' + long

    request({url, json: true},(error, {body} = {}) => {

        if(error){
            callback('Unable to find weather', undefined)
         }
         else if(body.error){
             callback('Unable to find weather for that location. Try another search', undefined)
         }
         else{
             callback(undefined, body.current.weather_descriptions[0]+'. Current temperature is '+ body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees. Humidity is ' + body.current.humidity)
         }
    })
}
module.exports = forecast
