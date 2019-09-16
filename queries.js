const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'TicketLo',
	password: 'postgres',
	port: 5432,
})
//CRUD user
const getUsers = (request, response) => {
	pool.query('SELECT * FROM Systemuser ORDER BY SystemUserId ASC', (error, results) => {
		if(error){
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getUserById = (request, response) =>{
	const id = parseInt(request.params.id)
	pool.query('SELECT * FROM Systemuser WHERE SystemUserId = $1', [id], (error, results) => {
		if(error){
			throw error
		}

		response.status(200).json(results.rows)
	})
}

const createUser = (request, response) =>{
	const {Fullname, Email, Password} = request.body

	pool.query('INSERT INTO Systemuser (Fullname, Email, Password,CreatedOn,CreatedBy,ModifiedOn,ModifiedBy) VALUES ($1, $2, $3, NOW(), $4, NOW(), $5) RETURNING systemuserid', [Fullname, Email, Password,Fullname,Fullname], (error,result) =>{
		if(error){
			throw error
		}
		response.status(201).send(`User added with ID: ${result.rows[0].systemuserid}`)
	})
}

const updateUser = (request, response) =>{
	const id = parseInt(request.params.id)
	const {Fullname, Email, Password} = request.body

	pool.query('Update Systemuser set Fullname = $1, Email = $2, Password = $3, ModifiedOn = NOW(), ModifiedBy = $4 where SystemUserId = $5',
		[Fullname, Email, Password, Fullname, id],(error,results)=>{
			if (error) {
				throw error
			}
			response.status(200).send(`User modified with ID: ${id}`)
		})
}
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM Systemuser WHERE SystemUserId = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
//Login
const Login = (request, response) =>{
	const {Email, Password} = request.body
	pool.query('SELECT * FROM Systemuser WHERE Email = $1 and Password = $2', [Email,Password], (error, results) => {
		if(error){
			throw error
		}

		response.status(200).json(results.rows)
	})
}
//Event
const getEvents = (request, response) => {
	pool.query('SELECT * FROM Event where EventDate >= NOW() ORDER BY EventDate ASC', (error, results) => {
		if(error){
			throw error
		}
		response.status(200).json(results.rows)
	})
}
const getEventById = (request, response) =>{
	const id = parseInt(request.params.id)
	pool.query('SELECT * FROM Event WHERE EventId = $1', [id], (error, results) => {
		if(error){
			throw error
		}

		response.status(200).json(results.rows)
	})
}
const createEvent = (request, response) =>{
	const {EventName,EventDate,EventDescription,EventFee,Username} = request.body

	pool.query('INSERT INTO Event (EventName,EventDate,EventDescription,EventFee,CreatedOn,CreatedBy,ModifiedOn,ModifiedBy) VALUES ($1, $2, $3, $4, NOW(), $5, NOW(), $6) RETURNING eventid', [EventName,EventDate,EventDescription,EventFee,Username,Username], (error,result) =>{
		if(error){
			throw error
		}
		response.status(201).send(`Event added with ID: ${result.rows[0].eventid}`)
	})
}
const updateEvent = (request, response) =>{
	const id = parseInt(request.params.id)
	const {EventName,EventDate,EventDescription,EventFee,Username} = request.body

	pool.query('Update Event set EventName = $1, EventDate = $2, EventDescription = $3, EventFee = $4, ModifiedOn = NOW(), ModifiedBy = $5 where EventId = $6',
		[EventName, EventDate, EventDescription, EventFee, Username, id],(error,results)=>{
			if (error) {
				throw error
			}
			response.status(200).send(`Event modified with ID: ${id}`)
		})
}
const deleteEvent = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM Event WHERE EventId = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Event deleted with ID: ${id}`)
  })
}
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  Login,
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
}


