const path = require('path')
const express = require('express')
const hbs = require('hbs')
const  geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// const { Server } = require('http')



const app = express()
const port = process.env.PORT || 3000
// Define path for express config

const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engines and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to Server.

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    
res.render('index', {

title: 'Weather App',

name:  'Abdulmalik Sanni'

}) 

}) 

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Abdulmalik Sanni'
    } )
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: 'This is some helpful information.',
        title: 'Help',
        name: 'Abdulmalik Sanni'
    } )
})

app.get('/weather', (req, res) => {
if (!req.query.address) {
    return res.send({
        error: 'You must provide an address!'
    })
}
geocode(req.query.address, (error, { latitude, longitude, location}= {}) => {
if (error) {
    return res.send({ error })
}

forecast(latitude, longitude, (error, forecastData) => {
if (error) {
    return res.send({ error })
}

res.send({
    forecast: forecastData,
    location,
    address: req.query.address
})

})
})

    // res.send({
    //     forecast: forecastData,
    //     location,
    //     address: req.query.address
    // })
})


app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
res.send({
    products: []
})
})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Abdulmalik Sanni',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
res.render('404', {
    title: '404',
    name: 'Abdulmalik Sanni',
    errorMessage: 'Page not found'
})
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})