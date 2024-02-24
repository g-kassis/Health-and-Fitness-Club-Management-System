

function showProfile(){
    console.log('profile')
}

function showDashboard(){
    console.log('dashboard')

}

function showSchedule(){
    console.log('schedule')
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