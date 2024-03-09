
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
            document.getElementsByClassName('Mon-9').scheduleSlot.innerHTML = responseObj[0].monday
            document.getElementsByClassName('Tue-9').scheduleSlot.innerHTML = responseObj[0].tuesday
            document.getElementsByClassName('Wed-9').scheduleSlot.innerHTML = responseObj[0].wednesday
            document.getElementsByClassName('Thu-9').scheduleSlot.innerHTML = responseObj[0].thursday
            document.getElementsByClassName('Fri-9').scheduleSlot.innerHTML = responseObj[0].friday
            document.getElementsByClassName('Sat-9').scheduleSlot.innerHTML = responseObj[0].saturday
            document.getElementsByClassName('Sun-9').scheduleSlot.innerHTML = responseObj[0].sunday

            document.getElementsByClassName('Mon-10').scheduleSlot.innerHTML = responseObj[1].monday
            document.getElementsByClassName('Tue-10').scheduleSlot.innerHTML = responseObj[1].tuesday
            document.getElementsByClassName('Wed-10').scheduleSlot.innerHTML = responseObj[1].wednesday
            document.getElementsByClassName('Thu-10').scheduleSlot.innerHTML = responseObj[1].thursday
            document.getElementsByClassName('Fri-10').scheduleSlot.innerHTML = responseObj[1].friday
            document.getElementsByClassName('Sat-10').scheduleSlot.innerHTML = responseObj[1].saturday
            document.getElementsByClassName('Sun-10').scheduleSlot.innerHTML = responseObj[1].sunday

            document.getElementsByClassName('Mon-11').scheduleSlot.innerHTML = responseObj[2].monday
            document.getElementsByClassName('Tue-11').scheduleSlot.innerHTML = responseObj[2].tuesday
            document.getElementsByClassName('Wed-11').scheduleSlot.innerHTML = responseObj[2].wednesday
            document.getElementsByClassName('Thu-11').scheduleSlot.innerHTML = responseObj[2].thursday
            document.getElementsByClassName('Fri-11').scheduleSlot.innerHTML = responseObj[2].friday
            document.getElementsByClassName('Sat-11').scheduleSlot.innerHTML = responseObj[2].saturday
            document.getElementsByClassName('Sun-11').scheduleSlot.innerHTML = responseObj[2].sunday

            document.getElementsByClassName('Mon-12').scheduleSlot.innerHTML = responseObj[3].monday
            document.getElementsByClassName('Tue-12').scheduleSlot.innerHTML = responseObj[3].tuesday
            document.getElementsByClassName('Wed-12').scheduleSlot.innerHTML = responseObj[3].wednesday
            document.getElementsByClassName('Thu-12').scheduleSlot.innerHTML = responseObj[3].thursday
            document.getElementsByClassName('Fri-12').scheduleSlot.innerHTML = responseObj[3].friday
            document.getElementsByClassName('Sat-12').scheduleSlot.innerHTML = responseObj[3].saturday
            document.getElementsByClassName('Sun-12').scheduleSlot.innerHTML = responseObj[3].sunday

            document.getElementsByClassName('Mon-1').scheduleSlot.innerHTML = responseObj[4].monday
            document.getElementsByClassName('Tue-1').scheduleSlot.innerHTML = responseObj[4].tuesday
            document.getElementsByClassName('Wed-1').scheduleSlot.innerHTML = responseObj[4].wednesday
            document.getElementsByClassName('Thu-1').scheduleSlot.innerHTML = responseObj[4].thursday
            document.getElementsByClassName('Fri-1').scheduleSlot.innerHTML = responseObj[4].friday
            document.getElementsByClassName('Sat-1').scheduleSlot.innerHTML = responseObj[4].saturday
            document.getElementsByClassName('Sun-1').scheduleSlot.innerHTML = responseObj[4].sunday

            document.getElementsByClassName('Mon-2').scheduleSlot.innerHTML = responseObj[5].monday
            document.getElementsByClassName('Tue-2').scheduleSlot.innerHTML = responseObj[5].tuesday
            document.getElementsByClassName('Wed-2').scheduleSlot.innerHTML = responseObj[5].wednesday
            document.getElementsByClassName('Thu-2').scheduleSlot.innerHTML = responseObj[5].thursday
            document.getElementsByClassName('Fri-2').scheduleSlot.innerHTML = responseObj[5].friday
            document.getElementsByClassName('Sat-2').scheduleSlot.innerHTML = responseObj[5].saturday
            document.getElementsByClassName('Sun-2').scheduleSlot.innerHTML = responseObj[5].sunday

            document.getElementsByClassName('Mon-3').scheduleSlot.innerHTML = responseObj[6].monday
            document.getElementsByClassName('Tue-3').scheduleSlot.innerHTML = responseObj[6].tuesday
            document.getElementsByClassName('Wed-3').scheduleSlot.innerHTML = responseObj[6].wednesday
            document.getElementsByClassName('Thu-3').scheduleSlot.innerHTML = responseObj[6].thursday
            document.getElementsByClassName('Fri-3').scheduleSlot.innerHTML = responseObj[6].friday
            document.getElementsByClassName('Sat-3').scheduleSlot.innerHTML = responseObj[6].saturday
            document.getElementsByClassName('Sun-3').scheduleSlot.innerHTML = responseObj[6].sunday

            document.getElementsByClassName('Mon-4').scheduleSlot.innerHTML = responseObj[7].monday
            document.getElementsByClassName('Tue-4').scheduleSlot.innerHTML = responseObj[7].tuesday
            document.getElementsByClassName('Wed-4').scheduleSlot.innerHTML = responseObj[7].wednesday
            document.getElementsByClassName('Thu-4').scheduleSlot.innerHTML = responseObj[7].thursday
            document.getElementsByClassName('Fri-4').scheduleSlot.innerHTML = responseObj[7].friday
            document.getElementsByClassName('Sat-4').scheduleSlot.innerHTML = responseObj[7].saturday
            document.getElementsByClassName('Sun-4').scheduleSlot.innerHTML = responseObj[7].sunday

            document.getElementsByClassName('Mon-5').scheduleSlot.innerHTML = responseObj[8].monday
            document.getElementsByClassName('Tue-5').scheduleSlot.innerHTML = responseObj[8].tuesday
            document.getElementsByClassName('Wed-5').scheduleSlot.innerHTML = responseObj[8].wednesday
            document.getElementsByClassName('Thu-5').scheduleSlot.innerHTML = responseObj[8].thursday
            document.getElementsByClassName('Fri-5').scheduleSlot.innerHTML = responseObj[8].friday
            document.getElementsByClassName('Sat-5').scheduleSlot.innerHTML = responseObj[8].saturday
            document.getElementsByClassName('Sun-5').scheduleSlot.innerHTML = responseObj[8].sunday

            
            
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