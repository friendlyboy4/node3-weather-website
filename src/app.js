const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Set value for PORT when hosted remotely (Heroku etc.)
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'John'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'John'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'John',
    helpText: 'This is the help page from template'
  })
})



app.get('/weather', (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: 'You must provide a location'
    })
  }

  geocode(req.query.location, (error, {lat, long, loc} = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        location: loc,
        forecast: forecastData,
        address: req.query.location
      })
    })
  })
})

// Require geocode/forecast
// Use the addres to geocode
// Use the coords to get forecast
// Send back forecast and location


app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})



app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404: Not found',
    message: 'help article not found',
    name: 'John'
  })
})



// 404 page MUST go after others - '*' will relate to everything not already defined
app.get('*', (req, res) => {
  res.render('404', {
    title: '404: Not found',
    message: 'Page not found',
    name: 'John'
  })
})


app.listen(port, () => {
  console.log(`server is up on port ${port}`)
})