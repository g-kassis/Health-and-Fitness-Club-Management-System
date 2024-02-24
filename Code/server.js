const { render } = require('ejs')
const express = require('express') //express framework
const path = require('path')
const PORT = process.env.PORT || 3000 //allow environment variable to possible set PORT


const app = express()
let users;
//Middleware
app.use(express.static('public'));
app.use(express.json())

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', function(request, response) {
  //console.log('Welcome')
  response.sendFile(__dirname + '/views/registration.html')
})

app.get('/member', function(request, response) {
  console.log('member in')
  response.render(__dirname + '/views/member')
})

//when user logs in 
app.post('/userLogIn', function(request, response) {
  console.log('User LogIn')
  response.status(200).json(true)
})

//when admin logs in 
app.post('/admin', function(request, response) {
  console.log('admin')
  response.sendFile(__dirname + '/public/admin.html')
})

//when user signs up
app.post('/registration', function(request, response) {
  console.log('User Registration')

  //check if user already exists in database
  console.log(request.body)
  response.status(200).json(false)
  
})
//removes/bans users
app.post('/removeUser', function(request, response) {
  
})

//application search getting API data
app.post('/search', function(request, response) {
  
})
  


//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000`)
  }
})