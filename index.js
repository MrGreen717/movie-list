const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const exphbs = require('express-handlebars')
const moviesRoutes = require('./routes/movies')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: true}))

app.use(cors())
app.use(express.json())
app.use(moviesRoutes)

// Add hbs 
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

//Start server
const PORT = 1337

app.listen(PORT, () => { 
    console.log(`Server has been started on port ${PORT}`)
})