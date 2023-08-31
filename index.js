const express = require('express')

require('dotenv').config()

const connect = require('./config/db')
const cors = require('cors')
const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors())



const User = require('./user/user.router')

const Crud = require('./crud/crud.router')



app.use('/user', User)
app.use('/',Crud)

app.get('/', (req,res)=>{
	return res.send("Hello World WELCOME to my Server")
})


app.listen(PORT,async()=>{
	await connect()
	console.log(`Listen at http://localhost:${PORT}`)
})