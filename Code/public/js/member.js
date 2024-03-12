
function getUsername(){
  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username');
  return username;
}


function showProfile(){

  console.log('profile: '.concat(getUsername()))
  if(window.location.href.includes('/memberProfile'+ window.location.search)){
    let data = Object()
    data.username = getUsername()


    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("data: " + this.responseText)

        let responseObj = JSON.parse(this.responseText)
        if(responseObj){
          console.log(responseObj[0])
          document.getElementById('sectionTitle').innerHTML =  responseObj[0].first_name+"'s Profile"
          document.getElementById('fname').value = responseObj[0].first_name
          document.getElementById('lname').value = responseObj[0].last_name
          document.getElementById('age').value = responseObj[0].age
          
        }else{
          console.log('User Does not Exists')
        }
      }
    }
    xhttp.open("POST", "/getProfileData") 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data))
  }else{

    //to redirect to profile page (if not there already)
    window.location.href = '/memberProfile'+ window.location.search
    
  }
}

function showDashboard(){
    
  console.log('dashboard: '.concat(getUsername()))
  if(window.location.href.includes('/memberDashboard'+ window.location.search)){
    // let data = Object()
    // data.username = getUsername()


    // let xhttp = new XMLHttpRequest()
    // xhttp.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {
    //     //console.log("data: " + this.responseText)

    //     let responseObj = JSON.parse(this.responseText)
    //     if(responseObj){
    //       console.log(responseObj[0])
    //       document.getElementById('sectionTitle').innerHTML =  responseObj[0].first_name+"'s Dashboard"
          
    //     }else{
    //       console.log('User Does not Exists')
    //     }
    //   }
    // }
    // xhttp.open("POST", "/getDashboardData") 
    // xhttp.setRequestHeader("Content-Type", "application/json");
    // xhttp.send(JSON.stringify(data))

  }else{
    //to redirect to dashboard page (if not there already)
    window.location.href = '/memberDashboard'+ window.location.search
    
  }
    

}

function showSchedule(){
    
  console.log('schedule: '.concat(getUsername()))
  if(window.location.href.includes('/memberSchedule'+ window.location.search)){

  }else{
    //to redirect to schedule page (if not there already)
    window.location.href = '/memberSchedule'+ window.location.search

  }

}

//update profile send to server to update database
function updateProfile(){
  
  let data = Object()
    data.username = getUsername()
    data.fname = document.getElementById('fname').value
    data.lname = document.getElementById('lname').value
    data.age = document.getElementById('age').value
    data.gender = document.getElementById('gender').value
    data.country = document.getElementById('country').value

    data.weightGoal = document.getElementById('weightGoal').value
    data.muscleGoal = document.getElementById('muscleGoal').value
    data.enduranceGoal = document.getElementById('enduranceGoal').value
    data.flexibilityGoal = document.getElementById('flexibilityGoal').value

    data.weightMetric = document.getElementById('weightMetric').value
    data.heightMetric = document.getElementById('heightMetric').value

  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log("data: " + this.responseText)

      let responseObj = JSON.parse(this.responseText)
      console.log("from server: "+responseObj)
      if(responseObj){
        console.log('Success: Data updated')
        
      }else{
        console.log('Error: Data not updated')
      }
    }
  }
  xhttp.open("POST", "/updateProfile") 
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data))



}



function currentlyScheduledSessions(){
  //creates the curreently scheduled sessions section/table

  let right = document.getElementById('right')
  let containsTable = right.querySelector('table')

  //checks if there is a table and removes it to display new one
  if(containsTable) {
    containsTable.remove()
  }

  //creation of table and its headers
  let table = document.createElement('TABLE')
  table.className = "profileTable"
  const headers = document.createElement('tr');
  headers.className = 'table_header';
  const firstNameHeader = document.createElement('th');
  firstNameHeader.textContent = 'First Name';
  const lastNameHeader = document.createElement('th');
  lastNameHeader.textContent = 'Last Name';

  headers.appendChild(firstNameHeader);
  headers.appendChild(lastNameHeader);

  table.appendChild(headers);

  // Append the table to right div
  right.appendChild(table);

  //creating rows based on the number of returned results from the query
  for (let i = 0; i < profiles.length; i++) {
    const row = document.createElement('tr');
    row.className = 'row'
    const firstNameCell = document.createElement('td');
    const lastNameCell = document.createElement('td');
    const ageCell = document.createElement('td');
    const genderCell = document.createElement('td');

    firstNameCell.textContent = profiles[i].first_name;
    lastNameCell.textContent = profiles[i].last_name;

    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(ageCell);
    row.appendChild(genderCell);

    table.appendChild(row);
  }
}

function personalTrainingSession(){

  //hides buttons and updates title
  let personalTrainingButton = document.getElementById('personalTrainingButton')
  personalTrainingButton.style.display = 'none'
  let groupFitnessButton = document.getElementById('groupFitnessButton')
  groupFitnessButton.style.display = 'none'
  let title = document.getElementById('title')
  title.innerHTML = "Please Select your Trainer: "


  //shows the trainers to choose from
  let trainerSelector = document.getElementById('trainersSelection')
  trainerSelector.style.display = 'block'

  let currentScheduledSessions = document.getElementById('right')
  currentScheduledSessions.style.display = 'block'


  currentlyScheduledSessions()


}

function groupFitnessSession(){
  
}

function bookWithTrainer(trainer){
  let trainerName = trainer.replace('Avatar','')
  console.log('Trainer: '+ trainerName)


}

//event handlers for member

document.addEventListener('DOMContentLoaded', function() {
    
  document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'saveProfile'){
      updateProfile();
    }
  }); 

  //for session sign up and schedule display
  document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'personalTrainingButton'){
      personalTrainingSession();
    }
  });

  document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'groupFitnessButton'){
      groupFitnessSession();
    }
  });

  //when a trainer avatar is clicked
  document.addEventListener('click',function(e){
    if(e.target && e.target.className == 'trainerAvatar'){
      bookWithTrainer(e.target.id);
    }
  });

    document.getElementById('profileNav').addEventListener('click', showProfile)
    document.getElementById('dashboardNav').addEventListener('click', showDashboard)
    document.getElementById('scheduleNav').addEventListener('click', showSchedule)

    
})