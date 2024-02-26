
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
          document.getElementById('fname').value = responseObj[0].username
          
        }else{
          console.log('User Does not Exists')
        }
      }
    }
    xhttp.open("POST", "/getProfileData") 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data))
  }else{

    //to display profile page
    window.location.href = '/memberProfile'+ window.location.search
    
  }
  
  

}

function showDashboard(){
    
  console.log('dashboard: '.concat(getUsername()))
  if(window.location.href.includes('/memberDashboard'+ window.location.search)){
    //nothing
  }else{
    window.location.href = '/memberDashboard'+ window.location.search
    let data = Object()
    data.username = getUsername()


    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("data: " + this.responseText)

        let responseObj = JSON.parse(this.responseText)
        console.log("from server: "+responseObj)
        if(responseObj){
          console.log('Found')
          document.getElementById('fname').value = responseObj.username
          
        }else{
          console.log('User Does not Exists')
        }
      }
    }
    xhttp.open("POST", "/getDashboardData", false) 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data))
  }
    

}

function showSchedule(){
    
  console.log('schedule: '.concat(getUsername()))
  if(window.location.href.includes('/memberSchedule'+ window.location.search)){
    //nothing
  }else{
    window.location.href = '/memberSchedule'+ window.location.search

    let data = Object()
    data.username = getUsername()


    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("data: " + this.responseText)

        let responseObj = JSON.parse(this.responseText)
        console.log("from server: "+responseObj)
        if(responseObj){
          console.log('Found')
          document.getElementById('fname').value = responseObj.username
          
        }else{
          console.log('User Does not Exists')
        }
      }
    }
    xhttp.open("POST", "/getScheduleData", false) 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data))
  }

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