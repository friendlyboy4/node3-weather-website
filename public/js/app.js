console.log('Client side JS file is loaded')

// fetch is CLIENT SIDE ONLY - server side (node) is REQUEST

fetch('http://127.0.0.1:3000/weather?location=perth').then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error)
    } else {
      console.log(data.location)
      console.log(data.forecast)
    }
  })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.messageOne')
const messageTwo = document.querySelector('.messageTwo')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  messageOne.textContent = 'Loading forecast...'
  messageTwo.textContent = ''
  const location = search.value
  fetch(`http://127.0.0.1:3000/weather?location=${location}`).then((response) => {
    response.json().then((data) => {
      renderForecast(data)
    })
  })
})

const renderForecast = ({ error, location, forecast }) => {
  if (error) {
    messageOne.textContent = error
  } else {
    messageOne.textContent = location
    messageTwo.textContent = forecast
  }
}