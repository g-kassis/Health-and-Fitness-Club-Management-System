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
  response.render(__dirname + '/views/registration')
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
        await client.query('UPDATE members SET first_name = $2, last_name = $3, age = $4, gender = $5  WHERE username = $1', [request.body.username, request.body.fname, request.body.lname, request.body.age, request.body.gender]);
        await client.query('UPDATE fitnessGoals SET weight_goal = $2, muscle_goal = $3, endurance_goal= $4, flexibility_goal = $5  WHERE username = $1', [request.body.username, request.body.weightGoal, request.body.muscleGoal, request.body.enduranceGoal, request.body.flexibilityGoal]);
        await client.query('UPDATE healthMetrics SET weight = $2, height = $3  WHERE username = $1', [request.body.username, request.body.weightMetric, request.body.heightMetric]);
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
      

      const result = await client.query(`
      SELECT 
        AVG(hm.weight) AS average_weight,
        AVG(hm.height) AS average_height,
        AVG(fg.weight_goal) AS average_weight_goal,
        AVG(fg.muscle_goal) AS average_muscle_goal,
        AVG(fg.endurance_goal) AS average_endurance_goal
      FROM 
        healthMetrics hm
      JOIN 
        fitnessGoals fg ON hm.username = fg.username;`)

        const resultRoutines = await client.query(`
        SELECT 
          *
        FROM 
          exerciseRoutines WHERE username = '${request.body.username}';
      `);
      
      const resultAchievements = await client.query(`
        SELECT 
          enduranceAchievement,
          basketballAchievement,
          memberAchievement,
          weightAchievement,
          cyclingAchievement,
          footballAchievement
        FROM 
          fitnessAchievements;
      `);

      const combinedResults = {
        metrics: result.rows[0],
        routines: resultRoutines.rows,
        achievements: resultAchievements.rows[0]
      };

      console.log(result.rows);

      if (result.rows.length !== 0) {
        response.status(200).json(combinedResults); // Account found
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
        

        // Build the update query dynamically based on scheduleData
        console.log(request.body)
        result = await client.query(`SELECT * FROM membersessions WHERE username = '${request.body.username}' ORDER BY timeBooked`);


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

        // Build the update query dynamically based on scheduleData
        console.log(request.body)
        
        if(request.body.typeOfSession.includes('personal') ||request.body.typeOfSession.includes('Personal') && request.body.cancel == false){
          result = await client.query(`UPDATE bill SET numPersonalSessions = numPersonalSessions + 1 WHERE username = $1`, [request.body.newData]);
          result = await client.query(`INSERT INTO membersessions (username ,dayBooked, timeBooked, event, trainer) VALUES ($1, $2, $3, $4, $5)`, [request.body.newData ,request.body.day, request.body.time, request.body.typeOfSession, request.body.username]);


        }else if(request.body.typeOfSession.includes('personal') ||request.body.typeOfSession.includes('Personal') && request.body.cancel == true){
          result = await client.query(`UPDATE bill SET numPersonalSessions = numPersonalSessions - 1 WHERE username = $1`, [request.body.newData]);
          result = await client.query(`DELETE FROM membersessions WHERE username = $1 AND dayBooked = $2 AND timeBooked = $3 AND event = $4 AND trainer = $5`, [request.body.newData ,request.body.day, request.body.time, request.body.typeOfSession, request.body.username]);


        }else if((request.body.typeOfSession.includes('Group') ||request.body.typeOfSession.includes('group')) && request.body.cancel == false){
          result = await client.query(`UPDATE bill SET numgroupfitness = numgroupfitness + 1 WHERE username = $1`, [request.body.newData]);
          result = await client.query(`INSERT INTO membersessions (username ,dayBooked, timeBooked, event, trainer) VALUES ($1, $2, $3, $4, $5)`, [request.body.newData ,request.body.day, request.body.time, request.body.typeOfSession, request.body.username]);


        }else if (request.body.typeOfSession.includes('Group') ||request.body.typeOfSession.includes('group') && request.body.cancel == true){  
          result = await client.query(`UPDATE bill SET numgroupfitness = numgroupfitness - 1 WHERE username = $1`, [request.body.newData]);
          result = await client.query(`DELETE FROM membersessions WHERE username = $1 AND dayBooked = $2 AND timeBooked = $3 AND event = $4 AND trainer = $5`, [request.body.newData ,request.body.day, request.body.time, request.body.typeOfSession, request.body.username]);


        }
        console.log(result)



      console.log(result.rows);

      if (result.rows.length == 0) {
        result = await client.query(`SELECT * FROM memberSessions WHERE username = '${request.body.newData}' ORDER BY timeBooked`);
        
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
      result = await client.query(`SELECT * FROM trainerSchedules WHERE username = '${request.body.username}' ORDER BY timeBooked`);
      
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

        // Build the update query dynamically based on scheduleData
        console.log(request.body)

        if(request.body.newData == ''){
          result = await client.query(`DELETE FROM trainerSchedules WHERE username = $1 AND dayBooked = $2 AND timeBooked = $3`, [request.body.username ,request.body.day, request.body.time]);

        }else if(request.body.newData == 'UNAVAILABLE'){
          
          result = await client.query(`INSERT INTO trainerSchedules (username ,dayBooked, timeBooked, event) VALUES ($1, $2, $3, $4)`, [request.body.username ,request.body.day, request.body.time, request.body.newData]);

        }
        else if(request.body.typeOfSession.includes('personal') ||request.body.typeOfSession.includes('Personal')&& request.body.cancel == false){
          result = await client.query(`INSERT INTO trainerSchedules (username ,dayBooked, timeBooked, event) VALUES ($1, $2, $3, $4)`, [request.body.username ,request.body.day, request.body.time, request.body.typeOfSession]);


        }else if(request.body.typeOfSession.includes('personal')|| request.body.typeOfSession.includes('Personal') && request.body.cancel == true){
          result = await client.query(`DELETE FROM trainerSchedules WHERE username = $1 AND dayBooked = $2 AND timeBooked = $3`, [request.body.username ,request.body.day, request.body.time]);


        }else if(request.body.typeOfSession.includes('group') || request.body.typeOfSession.includes('Group') && request.body.cancel == false){
          result = await client.query(`INSERT INTO trainerSchedules (username ,dayBooked, timeBooked, event) VALUES ($1, $2, $3, $4)`, [request.body.username ,request.body.day, request.body.time, request.body.typeOfSession]);


        }else if(request.body.typeOfSession.includes('group') || request.body.typeOfSession.includes('Group') && request.body.cancel == true){  
          result = await client.query(`DELETE FROM trainerSchedules WHERE username = $1 AND dayBooked = $2 AND timeBooked = $3`, [request.body.username ,request.body.day, request.body.time]);

        } 



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

//---------------------------------------------------------------------ADMINS--------------------------------------------

app.get('/adminBilling',function(request, response) {
  console.log('Member Profile')
  response.render(__dirname + '/views/adminBilling')
})

app.get('/adminClassSchedule',function(request, response) {
  console.log('Member Profile')
  response.render(__dirname + '/views/adminClassSchedule')
})

app.get('/adminEquipmentMonitor',function(request, response) {
  console.log('Member Profile')
  response.render(__dirname + '/views/adminEquipmentMonitor')
})

app.get('/adminRoomManagement',function(request, response) {
  console.log('Member Profile')
  response.render(__dirname + '/views/adminRoomManagement')
})


app.post('/getAllMembers', async (request, response) => {
  console.log('All Members');

  try {
      // Connect to the PostgreSQL database using a connection pool
 

      result = await client.query(`SELECT * FROM members`);

      console.log(result.rows);

      if (result.rows.length != 0) {
        response.status(200).json(result.rows); //found and send
      }else{
        response.status(200).json(false); 
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});

app.post('/createEvent', async (request, response) => {
  console.log('createEvent');

  try {
      // Connect to the PostgreSQL database using a connection pool
 

      result = await client.query('INSERT INTO currentEvents (dayBooked, timeBooked, event, trainer) VALUES ($1, $2, $3, $4)', [request.body.day, request.body.time, request.body.newData, request.body.username]);


      console.log(result.rows);

      if (result.rows.length == 0) {
        response.status(200).json(result.rows);
      }else{
        response.status(200).json(false); 
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});

app.post('/getCurrentlyScheduledEvents', async (request, response) => {
  console.log('Get Events');

  try {
      // Connect to the PostgreSQL database using a connection pool
 

      result = await client.query('SELECT * FROM currentEvents');


      console.log(result.rows);

      if (result.rows.length != 0) {
        response.status(200).json(result.rows);
      }else{
        response.status(200).json(false); 
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});

app.post('/removeFromCurrentlyScheduled', async (request, response) => {
  console.log('Room Booking');
  console.log(request.body)

  try {
      // Connect to the PostgreSQL database using a connection pool
 

      result = await client.query('DELETE FROM currentEvents WHERE dayBooked = $1 AND timeBooked = $2 AND trainer = $3 AND event = $4', [request.body.day, request.body.time, request.body.trainer, request.body.event]);
      

      console.log(result.rows);

      if (result.rows.length == 0) {
        response.status(200).json(result.rows);
      }else{
        response.status(200).json(false); 
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});

app.post('/bookRoom', async (request, response) => {
  console.log('Room Booking');
  console.log(request.body)

  try {
      // Connect to the PostgreSQL database using a connection pool
 

      result = await client.query('SELECT * FROM roomBookings WHERE roomid = $1 AND dayBooked = $2 AND timeBooked = $3', [request.body.roomId, request.body.day, request.body.time]);
      if (result.rows.length != 0) {
        //room not free do not book

      }else{
        //room is free book event
        result = await client.query('INSERT INTO roomBookings (roomID, dayBooked, timeBooked, trainer, event) VALUES ($1, $2, $3, $4, $5)', [request.body.roomId, request.body.day, request.body.time, request.body.trainer, request.body.event]);
      }

      console.log(result.rows);

      if (result.rows.length == 0) {
        response.status(200).json(result.rows);
      }else{
        response.status(200).json(false); 
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});


app.post('/getEquipments', async (request, response) => {
  console.log('getEquipments');
  console.log(request.body)

  try {
      // Connect to the PostgreSQL database using a connection pool
 

      result = await client.query('SELECT * FROM equipment');

      console.log(result.rows);

      if (result.rows.length != 0) {
        response.status(200).json(result.rows);
      }else{
        response.status(200).json(false); 
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});

app.post('/updateEquipments', async (request, response) => {
  console.log('updateEquipments');
  console.log(request.body)

  try {
      // Connect to the PostgreSQL database using a connection pool
 

      result = await client.query(`UPDATE equipment SET equipmentStatus = $1 WHERE equipmentName = $2`, [request.body.status, request.body.equipmentName]);


      console.log(result.rows);

      if (result.rows.length == 0) {
        response.status(200).json(result.rows);
      }else{
        response.status(200).json(false); 
          
      }
  } catch (error) {
      // Handle errors
      console.error('Error executing database query:', error);
      response.status(500).json({ success: false, error: 'Internal Server Error' });
  } 
  
  
});

app.post('/getBill', async (request, response) => {
  console.log('get billings');
  console.log(request.body)

  try {
      // Connect to the PostgreSQL database using a connection pool
 

      result = await client.query(`SELECT * FROM bill`);


      console.log(result.rows);

      if (result.rows.length != 0) {
        response.status(200).json(result.rows);
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
        await client.query('INSERT INTO fitnessGoals (username, weight_goal, muscle_goal, endurance_goal) VALUES ($1, $2, $3, $4)',[request.body.username,160,10,7]);
        await client.query('INSERT INTO healthMetrics (username, weight, height) VALUES ($1, $2, $3)',[request.body.username,140,175]);
        await client.query('INSERT INTO exerciseroutines (username, pushups, pullups, situps, deadlift, squats) VALUES ($1, $2, $3, $4, $5, $6)',[request.body.username,'true','true', 'true', 'true', 'false']);
        await client.query('INSERT INTO fitnessAchievements (username, enduranceAchievement, basketballAchievement, memberAchievement, weightAchievement, cyclingAchievement, footballAchievement) VALUES ($1, $2, $3, $4, $5, $6, $7)', [request.body.username, 'true', 'false', 'true', 'true', 'true', 'true']);
        await client.query('INSERT INTO bill (username, first_name, last_name, numGroupFitness, numPersonalSessions) VALUES ($1, $2, $3, $4, $5)', [request.body.username, request.body.fname, request.body.lname ,0, 0]);
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