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
      // await client.connect();

      // Execute the provided query with parameterized query
      let result = await client.query(`
      SELECT 
          m.username, 
          m.passwrd, 
          m.first_name, 
          m.last_name, 
          m.age, 
          m.gender,
          fg.weight_goal,
          fg.muscle_goal,
          fg.endurance_goal,
          fg.flexibility_goal,
          hm.weight,
          hm.height
      FROM 
          members m
      LEFT JOIN 
          fitnessGoals fg ON m.username = fg.username
      LEFT JOIN 
          healthMetrics hm ON m.username = hm.username
      WHERE 
          m.username = $1`, [request.body.username]);
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
      // await client.connect();

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
      // await client.connect();

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
      // await client.connect();

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

app.post('/getMemeberSessions', async (request, response) => {
  console.log('getMemeberSessions: '.concat(request.body.username));

  try {
      // Connect to the PostgreSQL database using a connection pool
      // await client.connect();

      //gets table name (string manipulation)
      let tableName = request.body.username.replace('user','member');
      tableName = tableName + 'Sessions'
      console.log(tableName)
        

        // Build the update query dynamically based on scheduleData
        console.log(request.body)

        result = await client.query(`SELECT * FROM ${tableName} ORDER BY time`);

        console.log(result)



      console.log(result.rows);

      if (result.rows.length !== 0) {
        response.status(200).json(result.rows); // data found
      }else{
        response.status(200).json(false); 
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});

app.post('/updateMemberSessions', async (request, response) => {
  console.log('updateMemberSessions: '.concat(request.body.newData));

  //request.body.username = trainer username
  //request.body.newData = memeber username

  try {
      // Connect to the PostgreSQL database using a connection pool
      // await client.connect();

      //gets table name for trainer schedule (depending on username)
      let tableName = request.body.newData.replace('user','member');
      tableName = tableName + 'Sessions'
      console.log(tableName)

        // Build the update query dynamically based on scheduleData
        console.log(request.body)

        result = await client.query(`UPDATE ${tableName} SET ${request.body.day} = $1 WHERE time = $2`, [request.body.username, request.body.time]);

        console.log(result)



      console.log(result.rows);

      if (result.rows.length == 0) {
        result = await client.query(`SELECT * FROM ${tableName} ORDER BY time`);
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
      // await client.connect();

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
      // await client.connect();

      //gets all columns for trainer schedule (depending on username)
      result = await client.query(`SELECT * FROM ${request.body.username+'Schedule'} ORDER BY time`);
      
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
      // await client.connect();

      //gets table name for trainer schedule (depending on username)
      let tableName = request.body.username+'Schedule';

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
      // await client.connect();

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
      // await client.connect();

      // Execute the provided query with parameterized query
      const checkResult = await client.query('SELECT username FROM members WHERE username = $1', [request.body.username]);

      if(checkResult.rows.length !== 0){
        response.status(200).json(true) //account exists
      }else{
        //adds member to members table
        await client.query('INSERT INTO members (username, passwrd, first_name, last_name) VALUES ($1, $2, $3, $4)', [request.body.username, request.body.password, request.body.fname, request.body.lname]);
        //adds member to healthMetrics table and fitnessGoals
        await client.query('INSERT INTO fitnessGoals (username, weight_goal, muscle_goal, endurance_goal, flexibility_goal) VALUES ($1, $2, $3, $4, $5)',[request.body.username,'Gain','Maintain','Lose','Maintain']);
        await client.query('INSERT INTO healthMetrics (username, weight, height) VALUES ($1, $2, $3)',[request.body.username,140,175]);

        //creates sessions table and adds time
        await client.query(`CREATE TABLE ${request.body.username+'Sessions'}(time VARCHAR(5),mon VARCHAR(50),tue VARCHAR(50),wed VARCHAR(50),thu VARCHAR(50),fri VARCHAR(50),sat VARCHAR(50),sun VARCHAR(50));`)
        await client.query(`
        INSERT INTO ${request.body.username+'Sessions'} (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('9am', '', '', '', '', '', '', '');
        INSERT INTO ${request.body.username+'Sessions'} (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('10am', '', '', '', '', '', '', '');
        INSERT INTO ${request.body.username+'Sessions'} (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('11am', '', '', '', '', '', '', '');
        INSERT INTO ${request.body.username+'Sessions'} (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('12pm', '', '', '', '', '', '', '');
        INSERT INTO ${request.body.username+'Sessions'} (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('1pm', '', '', '', '', '', '', '');
        INSERT INTO ${request.body.username+'Sessions'} (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('2pm', '', '', '', '', '', '', '');
        INSERT INTO ${request.body.username+'Sessions'} (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('3pm', '', '', '', '', '', '', '');
        INSERT INTO ${request.body.username+'Sessions'} (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('4pm', '', '', '', '', '', '', '');
        INSERT INTO ${request.body.username+'Sessions'} (time, mon, tue, wed, thu, fri, sat, sun) VALUES ('5pm', '', '', '', '', '', '', '');
        `)
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