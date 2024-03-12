const { render } = require('ejs')
const { Pool } = require('pg');
const express = require('express') //express framework
const path = require('path')
const client = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'HealthAndFitnessClub',
  password: 'postgres',
  port: 5432,
});



const PORT = process.env.PORT || 3000 //allow environment variable to possible set PORT


const app = express()
//Middleware
app.use(express.static('public'));
app.use(express.json())

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', function(request, response) {
  //console.log('Welcome')
  response.sendFile(__dirname + '/views/registration.html')
})


//--------------------------------------MEMBERS---------------------------------------------------------------------------
app.get('/memberProfile',function(request, response) {
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

app.post('/getProfileData', async (request, response) => {
  console.log('getProfileData: '.concat(request.body.username));

  try {
      // Connect to the PostgreSQL database using a connection pool
      await client.connect();

      // Execute the provided query with parameterized query
      const result = await client.query('SELECT username, passwrd, first_name, last_name, age FROM members WHERE username = $1', [request.body.username]);
      console.log(result.rows);

      if (result.rows.length !== 0) {
        response.status(200).json(result.rows); // Account found
      }else{
        response.status(200).json(false); // Account not found
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});

//to update user profile
app.post('/updateProfile', async (request, response) => {
  console.log('Profile Update');
  console.log(request.body);

  try {
      // Connect to the PostgreSQL database using a connection pool
      await client.connect();

      // Execute the provided query with parameterized query
      const checkResult = await client.query('SELECT username FROM members WHERE username = $1', [request.body.username]);

      if(checkResult.rows.length !== 0){
        await client.query('UPDATE members SET first_name = $2, last_name = $3  WHERE username = $1', [request.body.username, request.body.fname, request.body.lname]);
        response.status(200).json(true) //account exists
      }else{
        response.status(200).json(false) //account does not exist (account created)
        
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
});

app.post('/getDashboardData', async (request, response) => {
  console.log(request.body);

  try {
      // Connect to the PostgreSQL database using a connection pool
      await client.connect();

      // Execute the provided query with parameterized query
      const result = await client.query('SELECT username, passwrd, first_name, last_name FROM members WHERE username = $1', [request.body.username]);
      console.log(result.rows);

      if (result.rows.length !== 0) {
        response.status(200).json(result.rows); // Account found
      } else {
        response.status(200).json(false); // Account not found
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});

app.post('/getScheduleData', async (request, response) => {
  console.log(request.body);

  try {
      // Connect to the PostgreSQL database using a connection pool
      await client.connect();

      // Execute the provided query with parameterized query
      const result = await client.query('SELECT username, passwrd, first_name, last_name FROM members WHERE username = $1', [request.body.username]);
      console.log(result.rows);

      if (result.rows.length !== 0) {
        response.status(200).json(result.rows); // Account found
      } else {
        response.status(200).json(false); // Account not found
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});

//--------------------------------------TRAINERS-------------------------------------------------
app.get('/trainerMemberViewer',function(request, response) {
  console.log('Member Profile Viewer for Trainers')
  response.render(__dirname + '/views/trainerMemberView')
})

app.get('/trainerSchedule', function(request, response) {
  console.log('Trainer Schedule')
  response.render(__dirname + '/views/trainerSchedule')
})


app.post('/lookFor', async (request, response) => {
  console.log(request.body);

  try {
      // Connect to the PostgreSQL database using a connection pool
      await client.connect();

      // Execute the provided query with parameterized query
      const result = await client.query('SELECT first_name, last_name, age, gender FROM members WHERE first_name ILIKE $1', [request.body.firstname]);
      console.log(result.rows);

      if (result.rows.length !== 0) {
        response.status(200).json(result.rows); // Account found
      } else {
        response.status(200).json(false); // Account not found
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
});

app.post('/getTrainerSchedule', async (request, response) => {
  console.log('getTrainerSchedule: '.concat(request.body.username));

  try {
      // Connect to the PostgreSQL database using a connection pool
      await client.connect();

      // Execute the provided query with parameterized query
      let result = ''
      if(request.body.username === 'trainer1'){
        result = await client.query('SELECT * FROM trainer1Schedule ORDER BY time');
      }else if(request.body.username === 'trainer2'){
        result = await client.query('SELECT * FROM trainer2Schedule ORDER BY time');
      }else if(request.body.username === 'trainer3'){
        result = await client.query('SELECT * FROM trainer3Schedule ORDER BY time');
      }else if(request.body.username === 'trainer4'){
        result = await client.query('SELECT * FROM trainer4Schedule ORDER BY time');
      }else if(request.body.username === 'trainer5'){
        result = await client.query('SELECT * FROM trainer5Schedule ORDER BY time');
      }else{

      }
      console.log(result.rows);

      if (result.rows.length !== 0) {
        response.status(200).json(result.rows); // Account found
      }else{
        response.status(200).json(false); // Account not found
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});

app.post('/updateTrainerSchedule', async (request, response) => {
  console.log('updateTrainerSchedule: '.concat(request.body.username));

  try {
      // Connect to the PostgreSQL database using a connection pool
      await client.connect();

      // Execute the provided query with parameterized query
      let tableName = '';
        switch (request.body.username) {
            case 'trainer1':
                tableName = 'trainer1Schedule';
                break;
            case 'trainer2':
                tableName = 'trainer2Schedule';
                break;
            case 'trainer3':
                tableName = 'trainer3Schedule';
                break;
            case 'trainer4':
                tableName = 'trainer4Schedule';
                break;
            case 'trainer5':
                tableName = 'trainer5Schedule';
                break;
            default:
                // Handle unrecognized username
                response.status(400).json({ success: false, error: 'Invalid username' });
                return;
        }

        // Build the update query dynamically based on scheduleData
        console.log(request.body)

        result = await client.query(`UPDATE ${tableName} SET ${request.body.day} = $1 WHERE time = $2`, [request.body.newData, request.body.time]);

        console.log(result)



      console.log(result.rows);

      if (result.rows.length == 0) {
        response.status(200).json(result.rows); // data updated
      }else{
        response.status(200).json(false); 
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});


//------------------------------------------------------------------------------------------------

//when user logs in 
app.post('/userLogIn', async (request, response) => {
  console.log('User LogIn');
  console.log(request.body);

  try {
      // Connect to the PostgreSQL database using a connection pool
      await client.connect();

      // Execute the provided query with parameterized query
      let result = await client.query('SELECT username, passwrd FROM members WHERE username = $1 AND passwrd = $2', [request.body.username, request.body.password]);
      
      if(result.rows.length === 0){
        result = await client.query('SELECT username, passwrd FROM trainers WHERE username = $1 AND passwrd = $2', [request.body.username, request.body.password]);

      }
      if(result.rows.length === 0){
        result = await client.query('SELECT username, passwrd FROM admins WHERE username = $1 AND passwrd = $2', [request.body.username, request.body.password]);

      }

      if (result.rows.length !== 0) {
          response.status(200).json(JSON.stringify(result.rows)); // Account found
      } else {
          response.status(200).json(false); // Account not found
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});

//when user registers
app.post('/registration', async (request, response) => {
  console.log('User registration');
  console.log(request.body);

  try {
      // Connect to the PostgreSQL database using a connection pool
      await client.connect();

      // Execute the provided query with parameterized query
      const checkResult = await client.query('SELECT username FROM members WHERE username = $1', [request.body.username]);

      if(checkResult.rows.length !== 0){
        response.status(200).json(true) //account exists
      }else{
        await client.query('INSERT INTO members (username, passwrd, first_name, last_name) VALUES ($1, $2, $3, $4)', [request.body.username, request.body.password, request.body.fname, request.body.lname]);
        response.status(200).json(false) //account does not exist (account created)
        
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
});


//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000`)
  }
})