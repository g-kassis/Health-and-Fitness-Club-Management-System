
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

            //turns responeobj array to a JSON object
            const jsObject = {};
            responseObj.forEach(entry => {
              const { time, ...rest } = entry;
              const key = time.replace(/[ap]m/g, ''); // Remove "am" and "pm"
              jsObject[key] = rest;
            });
            console.log(jsObject);

            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            for (let hour = 9; hour <= 12; hour++) {
              for (let i = 0; i < daysOfWeek.length; i++) {
                const className = `${daysOfWeek[i]}-${hour}`;
                const day = daysOfWeek[i].toLowerCase()
                document.getElementsByClassName(className).scheduleSlot.innerHTML = jsObject[hour][day];
              }
            }

            for (let hour = 1; hour <= 5; hour++) {
              for (let i = 0; i < daysOfWeek.length; i++) {
                const className = `${daysOfWeek[i]}-${hour}`;
                day = daysOfWeek[i].toLowerCase()
                document.getElementsByClassName(className).scheduleSlot.innerHTML = jsObject[hour][day];
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

  document.getElementById("myModal").style.display = "block";
  
  //sets the modal title to the box clicked
  let title = document.getElementById('formTitle')
  title.innerHTML = 'Edit ' + scheduleSlot.className;

  //gets text in scheduleSlot
  if(scheduleSlot.innerHTML === ''){
    //do nothing
  }else if(scheduleSlot.innerHTML === 'UNAVAILABLE'){
    //do nothing
  }else{
    
    let arrN = scheduleSlot.innerHTML.split('\n')
    let t = arrN[0].split('Title: ')
    let n =  arrN[1].split('Notes: ')

    //fills textboxes if schedule slot is already filled
    document.getElementById('titleText').value = t[1]
    document.getElementById('notesText').value = n[1]

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

function updateSchedule(newData,slot){

  let data = Object()
    data.username = getUsername()
    data.day = slot.substring(0,4).toLowerCase()
    data.time = slot.substring(5,slot.length) + amORpm(slot.substring(5,slot.length))
    data.newData = newData

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


//adds to schedule
function addToSchedule(){
  let title = document.getElementById('formTitle').innerHTML
  let arr = title.split('Edit')
  scheduleSlot = arr[1]
  console.log(scheduleSlot);

  //adds to scheduleSlot the notes and title
  let slotTitle = document.getElementById('titleText').value
  let slotNotes = document.getElementById('notesText').value
  
  let slot = document.getElementsByClassName(scheduleSlot)[0]
  slot.innerHTML = 'Title: ' + slotTitle + '\n' + 'Notes: ' + slotNotes;

  //clears text boxes
  document.getElementById('titleText').value = ''
  document.getElementById('notesText').value = ''


  updateSchedule(slot.innerHTML,scheduleSlot)


  //closes modal
  let modal = document.getElementById('myModal')
  modal.style.display = "none";

  
}


//sets unaivalablity on schedule
function setUnavailable(){
  let title = document.getElementById('formTitle').innerHTML
  let arr = title.split('Edit')
  scheduleSlot = arr[1]
  console.log(scheduleSlot);


  let slot = document.getElementsByClassName(scheduleSlot)[0]
  slot.innerHTML = 'UNAVAILABLE';

  //clears text boxes
  document.getElementById('titleText').value = ''
  document.getElementById('notesText').value = ''

  updateSchedule(slot.innerHTML, scheduleSlot)

  //closes modal
  let modal = document.getElementById('myModal')
  modal.style.display = "none";

  
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

    //the add button inside the modal to edit a slot
    document.addEventListener('click',function(e){
      if(e.target && e.target.id== 'addBtn'){
          addToSchedule();
      }
    }); 

    //the not available button inside the modal to edit a slot
    document.addEventListener('click',function(e){
      if(e.target && e.target.id== 'notAvailable'){
          setUnavailable();
      }
    }); 

})