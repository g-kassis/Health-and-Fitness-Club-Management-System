
var sound = new Howl({
  src: ['bravo.mp3']
});

function playAudio() {
  sound.play();
}


function register(){
  //gets usrname and pass
  let username = document.getElementById('usrn').value
  let password = document.getElementById('pswd').value
  let fname = document.getElementById('fname').value
  let lname = document.getElementById('lname').value
  //makes sure text fields are completed
  if(username === '' || password === '' || fname === '' || lname === ''){
    document.getElementById('warnings').innerHTML = 'Please Fill All Fields';
    return
  }
  if(username.includes('trainer') || username.includes('admin')){
    document.getElementById('warnings').innerHTML = 'Username not allowed';
    return
  }

  //checks for username and pass eligibility
  if(username !== '' && isLetter(username.charAt(0)) && !username.includes(" ")){
    //console.log("Username: " + username)
    
    let userData = new Object();
      userData.username = username;
      userData.password = password;
      userData.fname = fname
      userData.lname = lname
    
    //creates credentials if they dont exist (send to server)
    
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("data: " + this.responseText)

        let responseObj = JSON.parse(this.responseText)
        //console.log("from server: "+responseObj)
        if(responseObj === false){
          console.log('User Created')
          document.getElementById('warnings').innerHTML = 'Account Created';
          window.location.href = '/memberProfile?username='+username
        }else{
          console.log('User Exists')
          document.getElementById('warnings').innerHTML = 'User Exists';
        }
      }
    }
    xhttp.open("POST", "registration") 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(userData)) 
    
  }else{
    //bad username
    document.getElementById('warnings').innerHTML = 'Username Contains Invalid Characters';
    document.getElementById('usrn').value = "";
    document.getElementById('pswd').value = "";

  }
}

function login(){
  playAudio();

  setTimeout(function() {
  //gets usrname and pass
  let username = document.getElementById('usrn').value
  let password = document.getElementById('pswd').value
  //makes sure text fields are completed
  if(username === '' || password === ''){
    document.getElementById('warnings').innerHTML = 'Please Fill Both Fields';
    return
  }

  let userData = new Object();
      userData.username = username;
      userData.password = password;
    
    //checks credentials if they exist (send to server)
    
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("data: " + this.responseText)

        let responseObj = JSON.parse(this.responseText)
        console.log("from server: "+responseObj)
        if(responseObj){
          console.log('User Logged In')
          document.getElementById('warnings').innerHTML = 'Welcome';

          //trainer log in
          if(username.includes('trainer')){
            window.location.href = '/trainerMemberViewer?username='+username

          }else if(username.includes('admin')){ // admin log in
            window.location.href = '/adminEquipmentMonitor?username='+username

          }else{ //member log in
            window.location.href = '/memberDashboard?username='+username
          }
          
        }else{
          console.log('User Does not Exists')
          document.getElementById('warnings').innerHTML = 'User not found OR wrong password';
        }
      }
    }
    xhttp.open("POST", "userLogIn") 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(userData))

  }, 4000);
    
}

//helper function to check if username starts with letter
function isLetter(char){
  if(char >= 'a' && char <= 'z' || char >= 'A' && char <='Z'){
      return true;
  }else{
      return false;
  }
}

function switchToLogIn(){
  //Title of page
  document.getElementById('welcomeMsg').innerText = "Log In"
  document.getElementById('warnings').innerText = ""

  //username and pass fields to reset to blank
  document.getElementById('usrn').value = "";
  document.getElementById('pswd').value = "";
  document.getElementById('fname').value = "";
  document.getElementById('lname').value = "";

  document.getElementById('fname').style.display = "none"
  document.getElementById('lname').style.display = "none"

  //buttons
  document.getElementById('loginButton').style.display = "initial"
  document.getElementById('switchToRegister').style.display = "initial"
  document.getElementById('registerButton').style.display = "none"
  document.getElementById('switchToLogin').style.display = "none"
}

//turns page into a sign up page
function switchToRegister(){
    document.getElementById('welcomeMsg').innerText = "Register"
    document.getElementById('warnings').innerText = ""

    //username and pass fields to reset to blank
    document.getElementById('usrn').value = "";
    document.getElementById('pswd').value = "";
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";

    document.getElementById('fname').style.display = "initial"
    document.getElementById('lname').style.display = "initial"

    //buttons
    document.getElementById('registerButton').style.display = "initial"
    document.getElementById('switchToLogin').style.display = "initial"
    document.getElementById('loginButton').style.display = "none"
    document.getElementById('switchToRegister').style.display = "none"
}

  
document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('loginButton').addEventListener('click', login)
    document.getElementById('switchToRegister').addEventListener('click', switchToRegister)

    document.getElementById('switchToLogin').addEventListener('click', switchToLogIn)
    document.getElementById('registerButton').addEventListener('click', register)
    
})