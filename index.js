const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use('/', require('./routes/movies'))

//Start server
const PORT = 1337

app.listen(PORT, () => { 
    console.log(`Server has been started on port ${PORT}`)
})