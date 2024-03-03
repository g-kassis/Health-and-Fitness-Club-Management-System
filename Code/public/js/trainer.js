
function showSchedule(){
    
    if(window.location.href.includes('/trainerSchedule')){

        //do nothing

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

    //checks if there is a table and removes it to display new one
    let mainContent = document.getElementById('mainContent')
    let containsTable = mainContent.querySelector('table')

    if(containsTable) {
        containsTable.remove()
    }

    let table = document.createElement('TABLE')
    const headers = document.createElement('tr');
    const firstNameHeader = document.createElement('th');
    firstNameHeader.textContent = 'First Name';
    const lastNameHeader = document.createElement('th');
    lastNameHeader.textContent = 'Last Name';

    headers.appendChild(firstNameHeader);
    headers.appendChild(lastNameHeader);

    table.appendChild(headers);

    // Append the table to mainContent
    mainContent.appendChild(table);


    for (let i = 0; i < profiles.length; i++) {
        const row = document.createElement('tr');
        const firstNameCell = document.createElement('td');
        const lastNameCell = document.createElement('td');
    
        firstNameCell.textContent = profiles[i].first_name;
        lastNameCell.textContent = profiles[i].last_name;
    
        row.appendChild(firstNameCell);
        row.appendChild(lastNameCell);
    
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
        }
      }
    }
    xhttp.open("POST", "/lookFor") 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data))




    //resets search bar
    document.getElementById('searchBar').value = ""


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
      
})