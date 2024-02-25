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
//-----------------------------------------------------------------------------------------------------------------------
app.get('/memberProfile', function(request, response) {
  console.log('Member Profile')
  response.render(__dirname + '/views/memberProfile')
})

app.get('/memberDashboard', function(request, response) {
  console.log('Member Dashboard')
  response.render(__dirname + '/views/memberDashboard')
})

app.get('/memberSchedule', function(request, response) {
  console.log('Member Schedule')
  response.render(__dirname + '/views/memberSchedule')
})

app.post('/getProfileData', function(request, response) {

})

app.post('/getDashboardData', function(request, response) {

})

app.post('/getScheduleData', function(request, response) {

})

//------------------------------------------------------------------------------------------------

//when user logs in 
app.post('/userLogIn', function(request, response) {
  console.log('User LogIn')
  response.status(200).json(true)
})


//when user signs up
app.post('/registration', function(request, response) {
  console.log('User Registration')

  //check if user already exists in database
  console.log(request.body)
  response.status(200).json(false)
  
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