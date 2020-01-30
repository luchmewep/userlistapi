const express = require('express')
const bodyParser = require('body-parser')


const users = require('./routes/users')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', users)

app.listen(3000, function() {
    console.log("Server started1 on port 3000");
    
})