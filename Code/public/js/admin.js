
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
      let usernameEntry = document.createElement('li')
      usernameEntry.innerHTML = 'Username: ' + profiles[i].username;
      let firstNameEntry = document.createElement('li')
      firstNameEntry.innerHTML = 'First Name: ' + profiles[i].first_name;
      let lastNameEntry = document.createElement('li')
      lastNameEntry.innerHTML = 'Last Name: ' + profiles[i].last_name;
      let Entry = document.createElement('li')
      list.appendChild(usernameEntry)
      list.appendChild(firstNameEntry)
      list.appendChild(lastNameEntry)
      list.appendChild(Entry)

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
          amountCell.innerHTML = parseInt(profiles[i][price])*parseInt(profiles[i][str]);
          amounts.push(parseInt(profiles[i][price])*parseInt(profiles[i][str]))
        }
        
    
        row.appendChild(quantityCell);
        row.appendChild(descriptionCell);
        row.appendChild(pricePerCell);
        row.appendChild(amountCell);
    
        table.appendChild(row);
      }

      let total = document.createElement('p')
      total.innerHTML = 'Total: $' + calculateTotal(amounts)
      
      panel.appendChild(list)
      panel.appendChild(table)
      panel.appendChild(total)
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

  
    document.getElementById('Booking').addEventListener('click', showRoomBooking)
    document.getElementById('Equipment_Monitoring').addEventListener('click', showEquipmentMonitor)
    document.getElementById('Class_Schedule_Update').addEventListener('click', showClassSchedule)
    document.getElementById('Billing&Payment').addEventListener('click', showBilling)
  
      
  })