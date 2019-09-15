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

app.get('/SystemUsers', db.getUsers)
app.get('/SystemUsers/:id', db.getUserById)
app.post('/SystemUsers', db.createUser)
app.put('/SystemUsers/:id', db.updateUser)
app.delete('/SystemUsers/:id', db.deleteUser)
app.post('/Login', db.Login)

app.listen(port,() => {
	  console.log(`App running on port ${port}.`)
})