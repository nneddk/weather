//time set
function startTime() {
    let today = new Date(), h = today.getHours(), m = today.getMinutes();
    let ampm = h > 12 ? 'pm': 'am';
    h = h % 12;
    h = h ? h: h = 12;
    h = checkTime(h);
    m = checkTime(m);
    document.getElementById('time-slot').textContent = h + ':' + m;
    document.getElementById('am-or-pm').textContent = ampm;
    setTimeout(startTime, 1000);
    
    function checkTime(i) {
        return (i < 10) ? '0' + i : i;
    }
}
//startTime();

//search location
const searchLocationBtn = document.getElementById('search-location-button');
searchLocationBtn.onclick = function(){
    const location = document.getElementById('location');
    updateTemp(location);
}

//api call to openweathermap url:  https://openweathermap.org/

async function updateTemp(location) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+location.value+'&appid=eca5ec86a08e6a56a853ad00606412d8&units=imperial');
    const data = await response.json();
    if (response.ok) {
      locationFound(data)
    } else {
      notFound();
    }
  }


function locationFound(data){
    console.log(data);
}

function notFound(){
    console.log('not found')
}

