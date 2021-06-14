const request = require('request')
const geoCode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?limit=2&access_token=pk.eyJ1Ijoic2tpcHBlcjk2MiIsImEiOiJja3BxcDVuMXMxN29yMnZwNDBxMjRnMWx2In0.S4G1b28K681Nn_qDRdoHpA&limit=1'

    request({url, json: true}, (error, {body} = {}) =>{
        if(error){
            callback('Unable to find the location', undefined)
        }
        else if(body.message || body.features.length<1){
            callback('Unable to find the location. Try another search', undefined)
        }
        else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode