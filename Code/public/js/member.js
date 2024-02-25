
function getUsername(){
    const queryParams = new URLSearchParams(window.location.search);
    const username = queryParams.get('username');
    return username;
}


function showProfile(){

    console.log('profile: '.concat(getUsername()))
    window.location.href = '/memberProfile'+ window.location.search
    
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("data: " + this.responseText)

        let responseObj = JSON.parse(this.responseText)
        //console.log("from server: "+responseObj)
        if(responseObj !== NULL){
          console.log('Found')
          
        }else{
          console.log('User Does not Exists')
        }
      }
    }
    xhttp.open("POST", "getProfileData") 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(getUsername()))

}

function showDashboard(){
    
    window.location.href = '/memberDashboard'.concat(window.location.search)
    console.log('dashboard: '.concat(getUsername()))

}

function showSchedule(){
    
    window.location.href = '/memberSchedule'.concat(window.location.search)
    console.log('schedule: '.concat(getUsername()))
}

//update profile send to server to update database
function updateProfile(){

}


//event handlers for member

document.addEventListener('DOMContentLoaded', function() {
    
    //document.getElementById('saveProfile').addEventListener('click', updateProfile)

    document.getElementById('profileNav').addEventListener('click', showProfile)
    document.getElementById('dashboardNav').addEventListener('click', showDashboard)
    document.getElementById('scheduleNav').addEventListener('click', showSchedule)

    
})