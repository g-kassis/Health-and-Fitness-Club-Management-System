
function getUsername(){
    const queryParams = new URLSearchParams(window.location.search);
    const username = queryParams.get('username');
    return username;
  }


function showRoomBooking(){
    console.log('showRoomBooking')
    if(window.location.href.includes('/adminRoomManagement'+ window.location.search)){
      


    }else{
  
      //to redirect to room booking page (if not there already)
      window.location.href = '/adminRoomManagement'+ window.location.search
      
    }

}

function showEquipmentMonitor(){
    console.log('showEquipmentMonitor')
    if(window.location.href.includes('/adminEquipmentMonitor'+ window.location.search)){
      
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
        console.log(profiles[i][str])
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
    xhttp.open("POST", "/getAllMembers") 
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
    roomName.innerHTML = ''
    roomCapcity.innerHTML = ''
    roomLayout.innerHTML = ''
    roomEquipment1.innerHTML =''

  }else if(roomID == 'room3'){

    roomImg.src = ''
    roomName.innerHTML = ''
    roomCapcity.innerHTML = ''
    roomLayout.innerHTML = ''
    roomEquipment1.innerHTML =''
    
  }else if(roomID == 'room4'){

    roomImg.src = ''
    roomName.innerHTML = ''
    roomCapcity.innerHTML = ''
    roomLayout.innerHTML = ''
    roomEquipment1.innerHTML =''
    
  }else if(roomID == 'room5'){

    roomImg.src = ''
    roomName.innerHTML = ''
    roomCapcity.innerHTML = ''
    roomLayout.innerHTML = ''
    roomEquipment1.innerHTML =''
    
  }else if(roomID == 'room6'){

    roomImg.src = ''
    roomName.innerHTML = ''
    roomCapcity.innerHTML = ''
    roomLayout.innerHTML = ''
    roomEquipment1.innerHTML =''
    
  }

  

}


function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById('mainContent').style.paddingLeft = '250px'
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById('mainContent').style.paddingLeft = '0px'
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


  
    document.getElementById('Booking').addEventListener('click', showRoomBooking)
    document.getElementById('Equipment_Monitoring').addEventListener('click', showEquipmentMonitor)
    document.getElementById('Class_Schedule_Update').addEventListener('click', showClassSchedule)
    document.getElementById('Billing&Payment').addEventListener('click', showBilling)
  
      
  })