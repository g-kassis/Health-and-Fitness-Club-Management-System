function getUsername(){
    const queryParams = new URLSearchParams(window.location.search);
    const username = queryParams.get('username');
    return username;
  }


function showRoomBooking(){
    console.log('showRoomBooking')
    if(window.location.href.includes('/adminRoomManagement'+ window.location.search)){
      
      let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            //console.log("data: " + this.responseText)

            let responseObj = JSON.parse(this.responseText)
            console.log(responseObj)
            if(responseObj){
              console.log('Success: Data recieved')
              showScheduledEvents(responseObj)
              
            }else{
              console.log('empty')
            }
          }
        }
        xhttp.open("POST", "/getCurrentlyScheduledEvents") 
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify())

    }else{
  
      //to redirect to room booking page (if not there already)
      window.location.href = '/adminRoomManagement'+ window.location.search

      
    }

}

function showEquipmentMonitor(){
    console.log('showEquipmentMonitor')
    if(window.location.href.includes('/adminEquipmentMonitor'+ window.location.search)){

      let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            //console.log("data: " + this.responseText)

            let responseObj = JSON.parse(this.responseText)
            console.log(responseObj)
            if(responseObj){
              console.log('Success: Data recieved')

              for(let i = 0; i < responseObj.length; i++){
                let equipmentName = responseObj[i].equipmentname.toLowerCase().replace(' ', '-')
                let eq = document.getElementById(equipmentName + '-progress')
                eq.innerHTML = responseObj[i].equipmentstatus + '%'
                eq.style.width = responseObj[i].equipmentstatus + '%'
                if(responseObj[i].equipmentstatus <= 100 && responseObj[i].equipmentstatus >= 80){
                  eq.className = 'w3-container w3-green w3-round-xlarge'
                }else if(responseObj[i].equipmentstatus < 80 && responseObj[i].equipmentstatus >= 60){
                  eq.className = 'w3-container w3-yellow w3-round-xlarge'
                }else if(responseObj[i].equipmentstatus < 60  && responseObj[i].equipmentstatus >= 40){
                  eq.className = 'w3-container w3-orange w3-round-xlarge'
                }else{
                  eq.className = 'w3-container w3-red w3-round-xlarge'
                }
              }
              
            }else{
              console.log('empty')
            }
          }
        }
        xhttp.open("POST", "/getEquipments") 
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify())
      
    }else{
  
      //to redirect to equipment monitor page (if not there already)
      window.location.href = '/adminEquipmentMonitor'+ window.location.search
      
    }
}


function showClassSchedule(){
    console.log('showClassSchedule')
    if(window.location.href.includes('/adminClassSchedule'+ window.location.search)){
      
    }else{
  
      //to redirect to class schedule update page (if not there already)
      window.location.href = '/adminClassSchedule'+ window.location.search
      
    }
}

function displayMembers(profiles){
    let mainContent = document.getElementById('mainContent')
    let containsAccordion = document.getElementById('accordionContainer')

    //checks if there is an accordion and removes it to display new one
    if(containsAccordion) {
      mainContent.removeChild(mainContent.lastChild)

    }
    let accordionContainer = document.createElement('div')
    accordionContainer.id = 'accordionContainer'
    mainContent.appendChild(accordionContainer)


    

    //creating rows based on the number of returned results from the query
    amounts = []
    for (let i = 0; i < profiles.length; i++) {
      
      let table = document.createElement('TABLE')
      table.className = "profileTable"
      const headers = document.createElement('tr');
      headers.className = 'table_header';
      const quantityHeader = document.createElement('th');
      quantityHeader.textContent = 'QTY';
      const descriptionHeader = document.createElement('th');
      descriptionHeader.textContent = 'DESCRIPTION';
      const unitPriceHeader = document.createElement('th');
      unitPriceHeader.textContent = 'UNIT PRICE';
      const amountHeader = document.createElement('th');
      amountHeader.textContent = 'AMOUNT';

      headers.appendChild(quantityHeader);
      headers.appendChild(descriptionHeader);
      headers.appendChild(unitPriceHeader);
      headers.appendChild(amountHeader);

      table.appendChild(headers);


      const accordionButton = document.createElement('button');
      accordionButton.className = 'accordion'
      accordionButton.id = 'accordion'+profiles[i].username
      accordionButton.innerHTML = profiles[i].first_name + ' ' + profiles[i].last_name;
      const panel = document.createElement('div');
      panel.className = 'panel'
      panel.id = 'panel'+profiles[i].username

      //info list
      let list = document.createElement('ul')
      panel.appendChild(list)
      

      accordionContainer.appendChild(accordionButton);
      accordionContainer.appendChild(panel);

      //for the membership entry
        const row = document.createElement('tr');
        row.className = 'table_row'
        const quantityCell = document.createElement('td');
        const descriptionCell = document.createElement('td');
        const pricePerCell = document.createElement('td');
        const amountCell = document.createElement('td');

        quantityCell.textContent = '1';
        descriptionCell.textContent = 'Membership';
        pricePerCell.textContent = '$100';
        amountCell.textContent = '$100';

        amounts.push(100)
    
        row.appendChild(quantityCell);
        row.appendChild(descriptionCell);
        row.appendChild(pricePerCell);
        row.appendChild(amountCell);
        table.appendChild(row);

      arr = ['numpersonalsessions','numgroupfitness']
      arrDescrip = ['Personal Trainning Session','Group Fitness Session']
      arrPrice = ['75','50']
      for(let num = 0; num < 2; num++){
        const row = document.createElement('tr');
        row.className = 'table_row'
        const quantityCell = document.createElement('td');
        const descriptionCell = document.createElement('td');
        const pricePerCell = document.createElement('td');
        const amountCell = document.createElement('td');

        let str = arr[num]
        let des = arrDescrip[num]
        let price = arrPrice[num]
        quantityCell.innerHTML = profiles[i][str];
        descriptionCell.innerHTML = des;
        pricePerCell.innerHTML = '$'+price;
        if(profiles[i][str] === 0){
          amountCell.innerHTML = '$0'
        }else{
          amountCell.innerHTML = '$'+parseInt(price)*parseInt(profiles[i][str]);
          amounts.push(parseInt(price)*parseInt(profiles[i][str]))
        }
        
    
        row.appendChild(quantityCell);
        row.appendChild(descriptionCell);
        row.appendChild(pricePerCell);
        row.appendChild(amountCell);
    
        table.appendChild(row);
      }

      let total = document.createElement('h2')
      total.innerHTML = 'Total: $' + calculateTotal(amounts)
      total.style.float = 'right'

      let processButton = document.createElement('button')
      processButton.id = 'process' + profiles[i].username
      processButton.className = 'processButton'
      processButton.style.float = 'left'
      processButton.innerHTML = 'Process Payment'

      
      panel.appendChild(list)
      panel.appendChild(table)
      panel.appendChild(total)
      panel.appendChild(processButton)
      amounts = []
      
    }
}

function calculateTotal(amounts){
  let total = 0
  for(let i = 0; i < amounts.length; i++){
    total += amounts[i]
  }
  return total
}

function showBilling(){
  console.log('showBilling')
  if(window.location.href.includes('/adminBilling'+ window.location.search)){
      
      let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("data: " + this.responseText)

        let responseObj = JSON.parse(this.responseText)
        if(responseObj){
          console.log(responseObj)
          displayMembers(responseObj);
          
        }else{
          console.log('No results')
          let mainContent = document.getElementById('mainContent')
          let containsTable = mainContent.querySelector('table')

          if(containsTable) {
            containsTable.remove()
          }
        }
      }
    }
    xhttp.open("POST", "/getBill") 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify())

  }else{
  
      //to redirect to billing and payment page (if not there already)
      window.location.href = '/adminBilling'+ window.location.search
      
  }
}

function bill(invoiceName){
  let username = invoiceName.id.substring(9,invoiceName.id.length)

  let panel = document.getElementById('panel'+username)

  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
  }
}


function maintainEquipment(equipmentName){

  equipmentName = equipmentName.replace('maintain-','')
  console.log('Maintenance for ' + equipmentName)
  //gets the equipment progress bar
  let equipmentBar = document.getElementById(equipmentName + '-progress')

  if(equipmentBar.style.width === 100){
    //if button spammed
    //do nothing if it already 100%
  }else{

    //maintain equipment
    equipmentBar.style.width = 100 + '%'
    equipmentBar.className = 'w3-container w3-green w3-round-xlarge'
    equipmentBar.innerHTML = '100%'

    let eq = equipmentName.split('-')

   
    let up1 =  eq[0].charAt(0).toUpperCase() +  eq[0].slice(1)
    let up2 = eq[1].charAt(0).toUpperCase() +  eq[1].slice(1)

    let data = Object()
      data.status = 100
      data.equipmentName = up1 + ' ' + up2

    let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            //console.log("data: " + this.responseText)

            let responseObj = JSON.parse(this.responseText)
            console.log(responseObj)
            if(responseObj){
              console.log('Success: Equipment Data Updated')
              
            }else{
              console.log('Equipment Data NOT Updated')
            }
          }
        }
        xhttp.open("POST", "/updateEquipments") 
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data))
  }
}

//----------------------------------------------------------------------room management----------------------------------------------------


function roomChange(roomID){
  
  let roomImg = document.getElementById('roomImg')
  let roomName = document.getElementById('roomName')
  let roomCapcity = document.getElementById('roomCapcityValue')
  let roomLayout = document.getElementById('roomLayoutValue')
  let roomEquipment1 = document.getElementById('roomEquipment1')
  let roomEquipment2 = document.getElementById('roomEquipment2')
  let roomEquipment3 = document.getElementById('roomEquipment3')
  let roomEquipment4 = document.getElementById('roomEquipment4')
  let roomEquipment5 = document.getElementById('roomEquipment5')
  let roomEquipment6 = document.getElementById('roomEquipment6')

  if(roomID == 'room1'){

    roomImg.src = 'https://www.wbdg.org/images/fitness_5.jpg'
    roomName.innerHTML = 'Fully Fitted Gym Room'
    roomCapcity.innerHTML = '20'
    roomLayout.innerHTML = '240x240'
    roomEquipment1.innerHTML = 'Multi-Gym'
    roomEquipment2.innerHTML = 'Bench Press'
    roomEquipment3.innerHTML = 'Tricep Pushdown'
    roomEquipment4.innerHTML = 'Lat Pulldown'
    roomEquipment5.innerHTML = 'Cardio Bike'
    roomEquipment6.innerHTML = 'Leg Press'


  }else if(roomID == 'room2'){

    roomImg.src = 'https://blog.anytimefitness.co.uk/wp-content/uploads/2019/01/treadmills-800x400.jpg'
    roomName.innerHTML = 'Treadmill Room'
    roomCapcity.innerHTML = ''
    roomLayout.innerHTML = ''
    roomEquipment1.innerHTML =''

  }else if(roomID == 'room3'){

    roomImg.src = ''
    roomName.innerHTML = ''
    roomCapcity.innerHTML = ''
    roomLayout.innerHTML = ''
    roomEquipment1.innerHTML =''
  }

}

//-----------------------------------------------------------------class schedule update------------------------------------------------------
let currentlySelected = Object()
  currentlySelected.event = ''
  currentlySelected.trainer = ''
  currentlySelected.time = ''

function onTrainerSelectShowSchedule(trainer){
  document.getElementById('schedule').style.display = 'block'

  let data = Object()
      data.username = trainer.id
  
  
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
                document.getElementsByClassName(className).scheduleSlot.setAttribute("Name", trainer.id) 
              }
            }

            for (let hour = 1; hour <= 5; hour++) {
              for (let i = 0; i < daysOfWeek.length; i++) {
                const className = `${daysOfWeek[i]}-${hour}`;
                day = daysOfWeek[i].toLowerCase()
                document.getElementsByClassName(className).scheduleSlot.innerHTML = '';
                document.getElementsByClassName(className).scheduleSlot.setAttribute("Name", trainer.id) 
              }
            }

            //shows the latest schedule
            for(let i = 0; i < responseObj.length; i++){

              let time = ''
              let day = ''
              time = responseObj[i].timebooked.slice(0,-2)
              day = responseObj[i].daybooked.charAt(0).toUpperCase() + responseObj[i].daybooked.slice(1)

              document.getElementsByClassName(day+ '-' + time).scheduleSlot.innerHTML = responseObj[i].event;
              document.getElementsByClassName(day+ '-' + time).scheduleSlot.setAttribute("Name", trainer.id) 
            }

            
          }else{
            console.log('Trainer Schedule Fully Clear')
          }
        }
      }
      xhttp.open("POST", "/getTrainerSchedule") 
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.send(JSON.stringify(data))
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

function createEvent(data){
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log("data: " + this.responseText)

      let responseObj = JSON.parse(this.responseText)
      console.log("from server: "+responseObj)
      if(responseObj){
        console.log('Success: Event Created')
        
      }else{
        console.log('Error: Event not Created')
      }
    }
  }
  xhttp.open("POST", "/createEvent") 
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data))

}

function updateSchedule(newData,slot){
  let data = Object()
    data.username = document.getElementsByClassName(slot).scheduleSlot.getAttribute('Name')
    data.day = slot.split('-')[0].toLowerCase().replace(/\s/g, '')
    data.time = slot.split('-')[1] + amORpm(slot.split('-')[1])
    data.newData = newData
    data.typeOfSession = newData
    data.cancel = false

  console.log(data)

  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log("data: " + this.responseText)

      let responseObj = JSON.parse(this.responseText)
      console.log("from server: "+responseObj)
      if(responseObj){
        console.log('Success: Data updated')
        createEvent(data)
        
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
function addToSchedule(add, time){
  
  //adds group class to slot
  let slot = document.getElementsByClassName(time)[0]
  slot.innerHTML = 'Group Fitness: ' + add;
}


function showScheduledEvents(events){

  let right = document.getElementById('columnRooms')
  console.log(right)
  let containsTable = right.querySelector('table')
  
  console.log(containsTable)
  if(containsTable){
    containsTable.remove()
  }

  //creation of table and its headers
  let table = document.createElement('TABLE')
  table.className = "profileTable"
  table.id = 'currentScheduleTable'
  const headers = document.createElement('tr');
  headers.className = 'table_header';

  const eventImg = document.createElement('th');
  eventImg.textContent = '';
  const eventHeader = document.createElement('th');
  eventHeader.textContent = 'Event';
  const timeHeader = document.createElement('th');
  timeHeader.textContent = 'Time';
  const trainerHeader = document.createElement('th');
  trainerHeader.textContent = 'Trainer';
  const bookHeader = document.createElement('th');
  bookHeader.textContent = 'Book Room';
  

  headers.appendChild(eventImg);
  headers.appendChild(eventHeader);
  headers.appendChild(timeHeader);
  headers.appendChild(trainerHeader)
  headers.appendChild(bookHeader)

  table.appendChild(headers);

  // Append the table to right div
  right.appendChild(table);
  

  //creating rows based on the number of returned results from the query
  for (let i = 0; i < events.length; i++) {

    
    const row = document.createElement('tr');
    row.className = 'table_row'
    const eventImgCell = document.createElement('td');
    const eventCell = document.createElement('td');
    const timeCell = document.createElement('td');
    const trainerCell = document.createElement('td');
    const bookCell = document.createElement('td');

    eventCell.textContent = events[i].event;
    timeCell.textContent = events[i].daybooked + ' - ' + events[i].timebooked;
    trainerCell.textContent =  events[i].trainer;

    //book button 
    let bookButton = document.createElement('button')
    bookButton.id = 'bookRoomBtn'
    bookButton.className = 'bookRoomBtn' 
    bookButton.innerHTML = 'Book Room'
    bookCell.appendChild(bookButton)

    //cancel cell with button
    let eventImage = document.createElement('img')

    


    row.appendChild(eventImgCell);
    row.appendChild(eventCell);
    row.appendChild(timeCell);
    row.appendChild(trainerCell)
    row.appendChild(bookCell)

    table.appendChild(row);

  }
    
}

function getRoomID(){
  let roomName = document.getElementById('roomName').innerHTML
  if(roomName == 'Fully Fitted Gym Room'){
    return 1
  }else if(roomName == 'Treadmill Room'){
    return 2
  }else{
    return 3
  }
}

function removeFromScheduledEvents(event, data){
  console.log(event)
  let table = document.getElementById('currentScheduleTable')
  table.removeChild(event)

  let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("data: " + this.responseText)

        let responseObj = JSON.parse(this.responseText)
        if(responseObj){
          console.log(responseObj)
          console.log('removed from currently scheduled')
          
        }else{
          console.log('Not removed from currently scheduled')

        }
      }
    }
    xhttp.open("POST", "/removeFromCurrentlyScheduled") 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data))


}

function processPayement(userName){
  console.log('Process Payement: ' + userName.split('process')[1])
  document.getElementById("mySidenav").style.width = "0"
  print()
  document.getElementById("mySidenav").style.width = "250px"

}

function onEventClick(event){
  let data = Object()
    data.roomId = getRoomID()
    data.day = event.parentNode.parentNode.children[2].innerHTML.split(' - ')[0]
    data.time = event.parentNode.parentNode.children[2].innerHTML.split(' - ')[1]
    data.event = event.parentNode.parentNode.children[1].innerHTML
    data.trainer = event.parentNode.parentNode.children[3].innerHTML
    

  //book room send to server
  let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("data: " + this.responseText)

        let responseObj = JSON.parse(this.responseText)
        if(responseObj){
          console.log(responseObj)
          document.getElementById('warning').style.color = 'green'
          document.getElementById('warning').innerHTML = 'Booked Succefully'
          removeFromScheduledEvents(event.parentNode.parentNode, data)
          
        }else{
          console.log('Not booked')
          document.getElementById('warning').style.color = 'red'
          document.getElementById('warning').innerHTML = 'Room already booked for this date and time'

        }
      }
    }
    xhttp.open("POST", "/bookRoom") 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data))

  //display the booking
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

//event handlers for admin
document.addEventListener('DOMContentLoaded', function() {
    
    document.addEventListener('click',function(e){
      if(e.target && e.target.id.includes('maintain')){
        maintainEquipment(e.target.id);
      }
    }); 

    document.addEventListener('click',function(e){
      if(e.target && e.target.className == 'accordion'){
        bill(e.target);
      }
    }); 

    document.addEventListener('click',function(e){
      if(e.target && e.target.id.includes('room')){
        roomChange(e.target.id);
      }
    }); 

    //when a trainer is clicked in class schedule update
    document.addEventListener('click',function(e){
      if(e.target && e.target.id.includes('trainer')){
        document.getElementById('scheduleTitle').innerHTML = 'Schedule Class On: '
        onTrainerSelectShowSchedule(e.target);
        currentlySelected.trainer = e.target.id
        console.log(currentlySelected)
      }
    }); 

    document.addEventListener('click',function(e){
      if(e.target && e.target.className == 'groupFit'){
        currentlySelected.event = e.target.id
        document.getElementById('warning').innerHTML = ''
        console.log(currentlySelected)
      }
    }); 

    //when a row is clicked (to be selected)
    document.addEventListener('click',function(e){
      if(e.target && e.target.id == 'bookRoomBtn'){
        onEventClick(e.target)
      }
    }); 

    document.addEventListener('click',function(e){
      if(e.target && e.target.id == 'scheduleSlot'){
        if(currentlySelected.event == ''){
          //warn user to select event
          document.getElementById('warning').style.color = 'red'
          document.getElementById('warning').innerHTML = 'Please Select an Event First'
        }else{
          addToSchedule(currentlySelected.event, e.target.className)
          currentlySelected.time = e.target.className
          console.log(currentlySelected)
        }
        
      }
    }); 

    document.addEventListener('click',function(e){
      if(e.target && e.target.id== 'updateClassScheduleBtn'){
        let slot = document.getElementsByClassName(currentlySelected.time)
        updateSchedule(slot.scheduleSlot.innerHTML,currentlySelected.time)
      }
    }); 

    document.addEventListener('click',function(e){
      if(e.target && e.target.className== 'processButton'){
        processPayement(e.target.id)
      }
    }); 


  
    document.getElementById('Booking').addEventListener('click', showRoomBooking)
    document.getElementById('Equipment_Monitoring').addEventListener('click', showEquipmentMonitor)
    document.getElementById('Class_Schedule_Update').addEventListener('click', showClassSchedule)
    document.getElementById('Billing&Payment').addEventListener('click', showBilling)
    document.getElementById('logOut').addEventListener('click', logOut)
  
      
  })