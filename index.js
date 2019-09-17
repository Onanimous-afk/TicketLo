const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.get('/', (reqest, response)=>{
	response.json({info: 'Node.js, Express, and Postgre API'})
})

app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)
//CRUD User
app.get('/SystemUsers', db.getUsers)
app.get('/SystemUsers/:id', db.getUserById)
app.post('/SystemUsers', db.createUser)
app.put('/SystemUsers/:id', db.updateUser)
app.delete('/SystemUsers/:id', db.deleteUser)
//LOGIN
app.post('/Login', db.Login)
//CRUD Event
app.get('/Event', db.getEvents)
app.get('/Event/:id', db.getEventById)
app.post('/Event', db.createEvent)
app.put('/Event/:id', db.updateEvent)
app.delete('/Event/:id', db.deleteEvent)
//Booking
app.get('/Booking/History/:id', db.getHistoryBooking)
app.get('/Booking/Current/:id', db.getCurrentBooking)
app.post('/Booking', db.createBooking)

app.listen(port,() => {
	  console.log(`App running on port ${port}.`)
})