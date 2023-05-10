function displayMessage(message, side) {
  let mes = document.createElement('div');
  mes.style.wordWrap = 'break-word';
  mes.style.borderRadius = '5px';
  mes.style.width = '30%';
  mes.style.height = '25px';
  mes.style.border = '3px solid #99ccff';
  mes.style.margin = '5px';
  mes.style.position = 'relative';
  mes.textContent = message;
  chat.appendChild(mes);
  if (side === 'client') {
    mes.style.alignSelf = 'flex-end';
  }
}


function success(position) {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  let geoMes = document.createElement('a');
  geoMes.style.wordWrap = 'break-word';
  geoMes.style.borderRadius = '5px';
  geoMes.style.width = '30%';
  geoMes.style.height = '25px';
  geoMes.style.border = '3px solid #99ccff';
  geoMes.style.margin = '5px';
  geoMes.style.position = 'relative';
  geoMes.textContent = 'Гео-локация';
  geoMes.style.alignSelf = 'flex-end';
  geoMes.style.target = '_blank';
  geoMes.href = `https://www.openstreetmap.org/#map=14/${latitude}/${longitude}`;
  chat.appendChild(geoMes);
  socket.send( `Широта: ${latitude} °, Долгота: ${longitude} °`);

}

function error() {
  displayMessage('Невозможно получить ваше местоположение');
  socket.send('Невозможно получить ваше местоположение');

}

let ignoreServerResponse = false;
const wsUri = "wss://echo-ws-service.herokuapp.com";
const btnMes = document.querySelector('.mes');
const btnGeo = document.querySelector('.geo');
const chat = document.querySelector('.chat');



let socket = new WebSocket(wsUri);


btnMes.addEventListener('click', function(e) {
  ignoreServerResponse = false; 
  let outgoingMessage = document.querySelector('.message').value;
  displayMessage(outgoingMessage, 'client');
  socket.send(outgoingMessage);
});

btnGeo.addEventListener('click', function() {
   ignoreServerResponse = true; 
   if (!navigator.geolocation) {
    displayMessage('Geolocation не поддерживается вашим браузером');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});


  socket.onmessage = function(e) {
    if(ignoreServerResponse === false){
      displayMessage(e.data, 'server')
    }
  };