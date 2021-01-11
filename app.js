const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json()) //without specifying the path, it will run with every request
//parses the request bodies into JSON

//import routes
const postsRoute = require('./routes/posts.js')
app.use('/posts', postsRoute)

//ROUTES
app.get('/', (req,res) => {
    res.send("we are at home")
})

//connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {console.log("connected to database")}
)

app.listen(3000)