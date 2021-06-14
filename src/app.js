
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Srinith'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Srinith'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Srinith',
        helpMessage: 'This is a help page'
    })
})
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Please input an address'
        })
    }
    geoCode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude,longitude, (forecasterror, forecastdata) => {
           if(forecasterror){
              return res.send({
                  error: forecasterror
              })
           }
        res.send({
            forecast : forecastdata,
            location: location,
            address: req.query.address
        })
       })

        
    })
})


app.get('/products', (req, res) => {
    
    if(!req.query.search){
       return res.send({
            error: 'You must enter a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: {}
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Srinith',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Srinith',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('App is up and running at port 3000')
})