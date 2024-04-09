
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
          document.getElementById('gender').value = responseObj[0].gender
      
          document.getElementById('weightGoal').value = responseObj[0].weight_goal
          document.getElementById('muscleGoal').value = responseObj[0].muscle_goal
          document.getElementById('enduranceGoal').value = responseObj[0].endurance_goal
      
          document.getElementById('weightMetric').value = responseObj[0].weight
          document.getElementById('heightMetric').value = responseObj[0].height
          
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
    let data = Object()
    data.username = getUsername()


    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("data: " + this.responseText)

        let responseObj = JSON.parse(this.responseText)
        if(responseObj){
          console.log(responseObj)
          //stats
          document.getElementById('avgWeightValue').innerHTML =  Math.round(responseObj.metrics.average_weight) + ' lbs'
          document.getElementById('avgHeightValue').innerHTML =  Math.round(responseObj.metrics.average_height) + ' cm'

          //goals
          document.getElementById('avgWeightGoal').innerHTML =  Math.round(responseObj.metrics.average_weight_goal) + ' lbs' 
          document.getElementById('avgMuscleGoal').innerHTML =  Math.round(responseObj.metrics.average_muscle_goal) + ' lbs'
          document.getElementById('avgEnduranceGoal').innerHTML =  Math.round(responseObj.metrics.average_endurance_goal) + ' km/h'
          
          //exercise routines
          // document.getElementById('avgWeightValue').innerHTML =  Math.round(responseObj[0].average_weight) + ' lbs'
          // document.getElementById('avgHeightValue').innerHTML =  Math.round(responseObj[0].average_height) + ' cm'
          // document.getElementById('avgWeightValue').innerHTML =  Math.round(responseObj[0].average_weight) + ' lbs'
          // document.getElementById('avgHeightValue').innerHTML =  Math.round(responseObj[0].average_height) + ' cm'


          //fitness achievements
          const achText = {
            basketballachievement: 'you have registered for a basketball class',
            cyclingachievement: 'you have won first place in cycling',
            enduranceachievement: 'you have completed a race',
            footballachievement: 'you have won a football title',
            memberachievement: 'you are a valued member',
            weightachievement: 'you have reached your weight goal'
          };

          const achSrc = {
            basketballachievement: "https://cdn-icons-png.flaticon.com/512/5182/5182243.png",
            cyclingachievement: "https://cdn-icons-png.flaticon.com/512/5182/5182205.png",
            enduranceachievement: "https://cdn-icons-png.flaticon.com/512/8145/8145752.png",
            footballachievement: "https://cdn-icons-png.flaticon.com/512/5182/5182254.png",
            memberachievement: "https://cdn-icons-png.flaticon.com/512/5182/5182296.png",
            weightachievement: "https://cdn-icons-png.flaticon.com/512/5182/5182322.png"
          };

          for (const key in responseObj.achievements) {
            if (responseObj.achievements[key] !== false) {
              console.log(key)
              document.getElementById(key + 'Text').innerHTML = achText[key]
              document.getElementById(key).src = achSrc[key]
              
            }
          }

        }else{
          console.log('User Does not Exists')
        }
      }
    }
    xhttp.open("POST", "/getDashboardData") 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data))

  }else{
    //to redirect to dashboard page (if not there already)
    window.location.href = '/memberDashboard'+ window.location.search
    
  }
    

}

function showSchedule(){
    
  console.log('schedule: '.concat(getUsername()))
  if(window.location.href.includes('/memberSchedule'+ window.location.search)){
    personalTrainingSession()

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

//----------------------------------------------------------------personal fitness-----------------------------------------

//creates the curreently scheduled sessions section/table
function currentlyScheduledSessions(sessions){
  console.log(sessions)
  

  let right = document.getElementById('right')
  let containsTable = right.querySelector('table')
  //console.log(containsTable)
  if(containsTable){
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
  const dateHeader = document.createElement('th');
  dateHeader.textContent = 'Date';
  const cancelHeader = document.createElement('th');
  cancelHeader.textContent = 'Cancel';

  headers.appendChild(firstNameHeader);
  headers.appendChild(lastNameHeader);
  headers.appendChild(dateHeader);
  headers.appendChild(cancelHeader)

  table.appendChild(headers);

  // Append the table to right div
  right.appendChild(table);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  //creating rows based on the number of returned results from the query
  for (let i = 0; i < sessions.length; i++) {

    for(let j = 0; j < daysOfWeek.length; j++){

      if(sessions[i][daysOfWeek[j].toLowerCase()]!== ''){
        const row = document.createElement('tr');
        row.className = 'row'
        const firstNameCell = document.createElement('td');
        const lastNameCell = document.createElement('td');
        const dateCell = document.createElement('td');
        const cancelCell = document.createElement('td');

        firstNameCell.textContent = sessions[i][daysOfWeek[j].toLowerCase()];
        lastNameCell.textContent = sessions[i][daysOfWeek[j].toLowerCase()];
        dateCell.textContent =  daysOfWeek[j] + ' - ' + sessions[i]['time']

        //cancel cell with button
        let cancelBtn = document.createElement('BUTTON')
        cancelBtn.innerHTML = 'X'
        cancelBtn.id = daysOfWeek[j] + '-' + sessions[i]['time']
        cancelBtn.className = 'cancelBookingBtn'
        cancelCell.append(cancelBtn)
        cancelCell.id = daysOfWeek[j] + '-' + sessions[i]['time'] + '-' + firstNameCell.textContent

        row.appendChild(firstNameCell);
        row.appendChild(lastNameCell);
        row.appendChild(dateCell);
        row.appendChild(cancelCell)

        table.appendChild(row);
      }

    }
    
  }
    
  
  
}

//updates session tables for memeber
function updateMemberSessions(SessionData){
  
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      let responseObj = JSON.parse(this.responseText)
      if(responseObj){
        console.log('Success: Memeber Session Data updated')
        //console.log(responseObj)
        currentlyScheduledSessions(responseObj)
        
      }else{
        console.log('Error: Session Data not updated')
      }
    }
  }
  xhttp.open("POST", "/updateMemberSessions") 
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(SessionData))
}

//displays and gets current scheduled sessions
function personalTrainingSession(){

  let title = document.getElementById('titleT')
  title.innerHTML = "Please Select your Trainer: "


  let data = Object()
    data.username = getUsername()

  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log("data: " + this.responseText)

      let responseObj = JSON.parse(this.responseText)
      if(responseObj){
        console.log('Success: Member Session Data received')
        console.log('Sending: Memeber Session Data to Table')
        currentlyScheduledSessions(responseObj)
        
      }else{
        console.log('Error: Data not found')
      }
    }
  }
  xhttp.open("POST", "/getMemeberSessions") 
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data))




}

//displays trainers schedule with data from database
function selectTrainer(trainer){
  let trainerName = trainer.name.replace('Avatar','')
  console.log('Trainer: '+ trainerName)

  document.getElementById("myModal").style.display = "block";
  
  //sets the modal title to the box clicked
  let title = document.getElementById('formTitle')
  title.innerHTML = 'Personal Training Session with ' + trainerName;

  //shows trainers schedule
  let data = Object()
      data.username = trainer.id
  
  
      let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //console.log("data: " + this.responseText)
  
          let responseObj = JSON.parse(this.responseText)
          if(responseObj){
            //console.log(responseObj)

            //turns responeobj array to a JSON object
            const jsObject = {};
            responseObj.forEach(entry => {
              const { time, ...rest } = entry;
              const key = time.replace(/[ap]m/g, ''); // Remove "am" and "pm"
              jsObject[key] = rest;
            });
            //console.log(jsObject);

            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            for (let hour = 9; hour <= 12; hour++) {
              for (let i = 0; i < daysOfWeek.length; i++) {
                const className = `${daysOfWeek[i]}-${hour}`;
                const day = daysOfWeek[i].toLowerCase()
                document.getElementsByClassName(className).scheduleSlot.innerHTML = jsObject[hour][day];
                document.getElementsByClassName(className).scheduleSlot.setAttribute("Name", trainer.id) 
              }
            }

            for (let hour = 1; hour <= 5; hour++) {
              for (let i = 0; i < daysOfWeek.length; i++) {
                const className = `${daysOfWeek[i]}-${hour}`;
                day = daysOfWeek[i].toLowerCase()
                document.getElementsByClassName(className).scheduleSlot.innerHTML = jsObject[hour][day];
                document.getElementsByClassName(className).scheduleSlot.setAttribute("Name", trainer.id) 
              }
            }

            
          }else{
            console.log('User Does not Exists')
          }
        }
      }
      xhttp.open("POST", "/getTrainerSchedule") 
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.send(JSON.stringify(data))

}

function openInnerModal(slot, trainer){
  //console.log(slot)

  //if slot is available
  if(slot.innerHTML == ''){
    //opens modal
    document.getElementById("myNav").style.width = "100%"
    //sets the modal title to the box clicked
    let title = document.getElementById('innerModalTitle')
    title.innerHTML = 'Book Personal Training Session on ' + slot.className;

    document.getElementById("userInfo").innerHTML = getUsername()
    document.getElementById("bookingInfo").innerHTML ='Session: Personal Training Session'
    document.getElementById("dateInfo").innerHTML = 'Time: '+ slot.className + amORpm(slot.className.substring(4,slot.className.length))
    document.getElementById("trainerInfo").innerHTML = 'Trainer: '+ trainer
    document.getElementById("price").innerHTML = '75'
        
    //hides the group fitness button
    document.getElementById('addGroupBtn').style.display = 'none'
    //shows the personal fitness button
    document.getElementById('addBtn').style.display = 'block'

  }else if (slot.innerHTML.includes('Group Fitness')){
    //opens modal
    document.getElementById("myNav").style.width = "100%"
    //sets the modal title to the box clicked
    let title = document.getElementById('innerModalTitle')
    title.innerHTML = 'Book Group Fitness - on ' + slot.className;

    document.getElementById("userInfo").innerHTML = getUsername()
    document.getElementById("bookingInfo").innerHTML ='Session: Group Fitness Session'
    document.getElementById("dateInfo").innerHTML = 'Time: '+ slot.className +amORpm(slot.className.substring(4,slot.className.length))
    document.getElementById("trainerInfo").innerHTML = 'Trainer: '+ trainer
    document.getElementById("price").innerHTML = '50'
    //shows the group fitness button
    document.getElementById('addGroupBtn').style.display = 'block'
    //hides the personal fitness button
    document.getElementById('addBtn').style.display = 'none'




  }else{
    //slot not available (do nothing)
  }


}

function amORpm(t){
  switch (t) {
    case '9':
      return 'am'
    case '10':
      return 'am'
    case '11':
      return 'am'
    case '12':
      return 'pm'
    case '1':
      return 'pm'
    case '2':
      return 'pm'
    case '3':
      return 'pm'
    case '4':
      return 'pm'
    case '5':
      return 'pm'
    default:
      return t
  }
}

//updates trainer schedule with new member personal session
function bookWithTrainer(slot, sessionType){
  let trainer = slot.parentNode.parentNode.parentNode.parentNode.children[2].children[0].children[2].children[2].getAttribute('Name')
  let dateTime = slot.parentNode.parentNode.children[1].innerHTML.replace('Book Personal Training Session on ','')
  console.log(dateTime)
  

  //adds to gui schedule
  document.getElementsByClassName(dateTime).scheduleSlot.innerHTML = getUsername()

  //sends to server to update database
  let data = Object()
    data.username = trainer //takes trainers username
    data.day = dateTime.substring(0,3).toLowerCase()
    data.time = dateTime.substring(4,dateTime.length) + amORpm(dateTime.substring(4,dateTime.length))
    data.newData = getUsername() //takes members username
    data.typeOfSession = sessionType
    data.cancel = false
  //console.log(data)

  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      let responseObj = JSON.parse(this.responseText)
      if(responseObj){
        console.log('Success: Trainer Schedule Data updated -- BookedWithTrainer')
        updateMemberSessions(data)
        
      }else{
        console.log('Error: Trainer Schedule Data not updated')
      }
    }
  }
  xhttp.open("POST", "/updateTrainerSchedule") 
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data))

  //closes the inner modal
  document.getElementById("myNav").style.width = "0%"

}

function cancelBooking(booking, sessionType){
  console.log('deleting: '+booking)
  let bookingData = booking.split('-')
  let data = Object()
    data.day = bookingData[0].toLowerCase()
    data.time = bookingData[1]
    data.username = bookingData[2] //trainer
    data.newData = ''
    data.typeOfSession = sessionType
    data.cancel = true
  console.log(data)

  //sends data to server for update/deletion from schedules and sessions
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      let responseObj = JSON.parse(this.responseText)
      if(responseObj){
        console.log('Success: Trainer Schedule Data updated -- DeletedFromTrainerSchedule')
        let data = Object()
          data.day = bookingData[0].toLowerCase()
          data.time = bookingData[1]
          data.username = ''
          data.newData = getUsername()
        updateMemberSessions(data)
        
      }else{
        console.log('Error: Trainer Schedule Data not updated')
      }
    }
  }
  xhttp.open("POST", "/updateTrainerSchedule") 
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data))
}

//--------------------------------------------------------------group fitness---------------------------------------------

function openNav() {
  document.getElementById('mainContent').style.paddingLeft = '250px'
  document.getElementById("mySidenav").style.width = "250px";
  
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById('mainContent').style.paddingLeft = '0px'
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



  //the cancel button inside the table to delete a slot
  document.addEventListener('click',function(e){
    if(e.target && e.target.className== 'cancelBookingBtn'){
      cancelBooking(e.target.parentNode.id, 'personal');
    }
  }); 

  //when a trainer avatar is clicked
  document.addEventListener('click',function(e){
    if(e.target && e.target.className == 'trainerAvatar'){
      selectTrainer(e.target);
    }
  });

  document.addEventListener('click',function(e){
    if(e.target && e.target.className== 'close'){
      let modal = document.getElementById('myModal')
      modal.style.display = "none";
    }
  }); 

  // When the user clicks anywhere outside of the modal, close it
  document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'myModal'){
      let modal = document.getElementById('myModal')
      modal.style.display = "none";
    }
  }); 

 

  /*-----------------------------------------------inner modal-------------------------------*/
  //for schedule managment when a schedule slot is clicked to book with trainer
  document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'scheduleSlot'){
      
      openInnerModal(e.target, e.target.getAttribute('name'));
    }
  }); 

  //x in top right to close inner modal
  document.addEventListener('click',function(e){
    if(e.target && e.target.className== 'closebtn'){
      document.getElementById("myNav").style.width = "0%"
    }
  }); 

  // When the user clicks anywhere outside of the inner modal content, close it
  document.addEventListener('click',function(e){
    if(e.target && e.target.className== 'overlay-content'){
      document.getElementById("myNav").style.width = "0%"
    }
  }); 

   //the add button inside the inner modal to book a slot
   document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'addBtn'){
        bookWithTrainer(e.target, 'personal');
    }
  }); 

  //achievements clicks
  document.addEventListener('click',function(e){
    if(e.target && e.target.className== 'fitnessAchievement'){
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
    }
  }); 

    document.getElementById('profileNav').addEventListener('click', showProfile)
    document.getElementById('dashboardNav').addEventListener('click', showDashboard)
    document.getElementById('scheduleNav').addEventListener('click', showSchedule)

    
})