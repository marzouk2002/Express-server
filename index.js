const express = require('express');
const path = require('path')
const exphbs= require("express-handlebars")
const members = require('./Members')
const logger = require('./middleware/logger')

const app =express();



// Init middleware
// app.use(logger)


// app.get('/',(req, res)=> {
//     res.sendFile(path.join(__dirname, 
//         'public',
//         'index.html'))
// })

// handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

//Init body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res)=>{
    res.render('index', {title:'Member app', members})
})

// Set static folder
app.use(express.static(path.join(__dirname, 
            'public')))

app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))