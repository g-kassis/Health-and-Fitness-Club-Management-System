
function getUsername(){
  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username');
  return username;
}

function showSchedule(){
    
    if(window.location.href.includes('/trainerSchedule')){

      let data = Object()
      data.username = getUsername()
  
  
      let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //console.log("data: " + this.responseText)
  
          let responseObj = JSON.parse(this.responseText)
          if(responseObj){
            console.log(responseObj)

            //clears the schedule first
            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            for (let hour = 9; hour <= 12; hour++) {
              for (let i = 0; i < daysOfWeek.length; i++) {
                const className = `${daysOfWeek[i]}-${hour}`;
                const day = daysOfWeek[i].toLowerCase()
                document.getElementsByClassName(className).scheduleSlot.innerHTML = '';
                document.getElementsByClassName(className).scheduleSlot.setAttribute("Name", data.username) 
              }
            }

            for (let hour = 1; hour <= 5; hour++) {
              for (let i = 0; i < daysOfWeek.length; i++) {
                const className = `${daysOfWeek[i]}-${hour}`;
                day = daysOfWeek[i].toLowerCase()
                document.getElementsByClassName(className).scheduleSlot.innerHTML = '';
                document.getElementsByClassName(className).scheduleSlot.setAttribute("Name", data.username) 
              }
            }

            //shows the latest schedule
            for(let i = 0; i < responseObj.length; i++){

              let time = ''
              let day = ''
              time = responseObj[i].timebooked.slice(0,-2)
              day = responseObj[i].daybooked.charAt(0).toUpperCase() + responseObj[i].daybooked.slice(1)

              document.getElementsByClassName(day+ '-' + time).scheduleSlot.innerHTML = responseObj[i].event;
              document.getElementsByClassName(day+ '-' + time).scheduleSlot.setAttribute("Name", data.username) 
            }

            
          }else{
            console.log('Trainer Schedule Fully Clear')
          }
        }
      }
      xhttp.open("POST", "/getTrainerSchedule") 
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.send(JSON.stringify(data))
      

    }else{
      //to redirect to schedule page (if not there already)
      window.location.href = '/trainerSchedule'+ window.location.search
  
    }
  
}

function showProfileViewer(){
    
    if(window.location.href.includes('/trainerMemberViewer')){
        //do nothing
    }else{
      //to redirect to schedule page (if not there already)
      window.location.href = '/trainerMemberViewer'+ window.location.search
  
    }
}

function displayProfiles(profiles){
    console.log(profiles)

    
    let mainContent = document.getElementById('mainContent')
    let containsTable = mainContent.querySelector('table')

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
    const ageHeader = document.createElement('th');
    ageHeader.textContent = 'Age';
    const genderHeader = document.createElement('th');
    genderHeader.textContent = 'Gender';

    headers.appendChild(firstNameHeader);
    headers.appendChild(lastNameHeader);
    headers.appendChild(ageHeader);
    headers.appendChild(genderHeader);

    table.appendChild(headers);

    // Append the table to mainContent
    mainContent.appendChild(table);

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
      ageCell.textContent = profiles[i].age;
      genderCell.textContent = profiles[i].gender;
  
      row.appendChild(firstNameCell);
      row.appendChild(lastNameCell);
      row.appendChild(ageCell);
      row.appendChild(genderCell);
  
      table.appendChild(row);
    }

    


}


function searchFor(){
    //gets query from searchbar
    let lookFor = document.getElementById('searchBar').value

    let data = Object()
    data.firstname = lookFor

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("data: " + this.responseText)

        let responseObj = JSON.parse(this.responseText)
        if(responseObj){
          console.log(responseObj[0])
          console.log('Results for: ' + lookFor)
          document.getElementById('resultsFor').innerHTML = 'Results for: ' + lookFor;

          displayProfiles(responseObj);
          
        }else{
          console.log('No results')
          document.getElementById('resultsFor').innerHTML = 'No Results';

          let mainContent = document.getElementById('mainContent')
          let containsTable = mainContent.querySelector('table')

          if(containsTable) {
            containsTable.remove()
          }
        }
      }
    }
    xhttp.open("POST", "/lookFor") 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data))




    //resets search bar
    document.getElementById('searchBar').value = ""


}

//---------------------------------------------------------------------------SCHEDULE MANAGEMENT-----------------------------------

function scheduleEdit(scheduleSlot){
  console.log(scheduleSlot);

  document.getElementById("myNav").style.width = "100%";
  
  //sets the modal title to the box clicked
  let title = document.getElementById('formTitle')
  title.innerHTML = 'Edit ' + scheduleSlot.className;

  //gets text in scheduleSlot
  if(scheduleSlot.innerHTML === ''){
    //do nothing
  }else if(scheduleSlot.innerHTML === 'UNAVAILABLE'){
    //do nothing
  }else{
    

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

function updateSchedule(newData,slot,cancel,type){
  console.log(slot)
  let data = Object()
    data.username = getUsername()
    data.day = slot.split('-')[0].toLowerCase().replace(/\s/g, '')
    data.time = slot.split('-')[1] + amORpm(slot.split('-')[1])
    data.newData = newData
    data.typeOfSession = type
    data.cancel = cancel

  console.log(data)

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
  xhttp.open("POST", "/updateTrainerSchedule") 
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data))
}

function clearSlot(){
  let title = document.getElementById('formTitle').innerHTML
  let arr = title.split('Edit')
  scheduleSlot = arr[1].replace(/\s/g, '')
  console.log(scheduleSlot);
  
  //clears slot
  let slot = document.getElementsByClassName(scheduleSlot)[0]

  if(slot.innerHTML == 'UNAVAILABLE'){
    console.log('in')
    updateSchedule('',scheduleSlot,true,'UNAVAILABLE')

  }else if(slot.innerHTML.includes('Personal') || slot.innerHTML.includes('personal')){
    updateSchedule('',scheduleSlot,true,'personal')

  }else if(slot.innerHTML.includes('Group') || slot.innerHTML.includes('group')){
    updateSchedule('',scheduleSlot,true,'group')
    
  }
  slot.innerHTML = '';
  
  
  //closes modal
  document.getElementById("myNav").style.width = "0%"
}


//adds to schedule
function addToSchedule(add){
  let title = document.getElementById('formTitle').innerHTML
  let arr = title.split('Edit')
  scheduleSlot = arr[1]
  console.log(scheduleSlot);
  
  //adds group class to slot
  let slot = document.getElementsByClassName(scheduleSlot)[0]
  slot.innerHTML = 'group Fitness: ' + add;


  updateSchedule(slot.innerHTML,scheduleSlot, false, 'Group Fitness: ' + add)


  //closes modal
  document.getElementById("myNav").style.width = "0%"

  
}


//sets unaivalablity on schedule
function setUnavailable(){
  let title = document.getElementById('formTitle').innerHTML
  let arr = title.split('Edit')
  scheduleSlot = arr[1]
  console.log(scheduleSlot);


  let slot = document.getElementsByClassName(scheduleSlot)[0]
  if(slot.innerHTML == ''){
    updateSchedule('UNAVAILABLE',scheduleSlot,true,'')

  }else if(slot.innerHTML.includes('Personal') || slot.innerHTML.includes('personal')){
    updateSchedule('UNAVAILABLE',scheduleSlot,true,'personal')

  }else if(slot.innerHTML.includes('Group') || slot.innerHTML.includes('group')){
    updateSchedule('UNAVAILABLE',scheduleSlot,true,'group')
    
  }
  slot.innerHTML = 'UNAVAILABLE';


  //closes modal
  document.getElementById("myNav").style.width = "0%"

  
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById('mainContent').style.paddingLeft = '250px'
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById('mainContent').style.paddingLeft = '0px'
}

function logOut(){
  window.location.href = '/'
}


//event handlers for trainer
document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('keydown',function(e){
        if(e.target && e.target.id== 'searchBar' && e.key == 'Enter'){
            searchFor();
        }
      }); 
    
    document.getElementById('memberProfileViewerNav').addEventListener('click', showProfileViewer)
    document.getElementById('trainerScheduleNav').addEventListener('click', showSchedule)

    //for schedule managment when a schedule slot is clicked to be edited
    document.addEventListener('click',function(e){
      if(e.target && e.target.id== 'scheduleSlot'){
          scheduleEdit(e.target);
      }
    }); 

    //the close button inside the modal to close the modal
    document.addEventListener('click',function(e){
      if(e.target && e.target.className== 'closebtn'){
        document.getElementById("myNav").style.width = "0";
      }
    }); 

    
    //the clear button inside the modal to clear a slot
    document.addEventListener('click',function(e){
      if(e.target && e.target.id== 'clearbtn'){
          clearSlot();
      }
    }); 


    //the group buttons inside the modal to add a class
    document.addEventListener('click',function(e){
      if(e.target && e.target.className== 'groupFit'){
          addToSchedule(e.target.id);
      }
    }); 

    //the not available button inside the modal to edit a slot
    document.addEventListener('click',function(e){
      if(e.target && e.target.id== 'notAvailable'){
          setUnavailable();
      }
    }); 

    document.getElementById('logOut').addEventListener('click', logOut)

})