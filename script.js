//add animated list
const animatedList = document.createElement('ul');
    animatedList.classList.add('shapes');
    for(let i = 0; i<10; i++){
        const shapeDiv = document.createElement('li');
        animatedList.appendChild(shapeDiv);
    }

document.body.appendChild(animatedList);

//time set
function startTime() {
    let today = new Date(), h = today.getHours(), m = today.getMinutes();
    let ampm = h > 12 ? 'pm': 'am';
    h = h % 12;
    h = h ? h: h = 12;
    h = checkTime(h);
    m = checkTime(m);
    document.getElementById('current-time').textContent = h + ':' + m;
    document.getElementById('current-am-or-pm').textContent = ampm;
    setTimeout(startTime, 1000);
    
    
}
function checkTime(i) {
  return (i < 10) ? '0' + i : i;
}
//startTime();

//search location
const searchLocationBtn = document.getElementById('search-location-button');
const searchLocation = document.getElementById('search-location');
searchLocation.onkeydown = function(e){
  if (e.key === 'Enter') {
    updateTemp(searchLocation);
  }
}
searchLocationBtn.onclick = function(){
    
    updateTemp(searchLocation);
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
    //city name, country
    console.log('name: ', data.name);
    console.log('country: ', data.sys.country);

    //coordinates
    console.log('long: ', data.coord.lon);
    console.log('lat: ', data.coord.lat);

    //temperature farenheit
    console.log('temp: ', data.main.temp);
    console.log('humidity: ', data.main.humidity);

    //weather
    console.log(data.weather[0].description);

    //sunrise, sunset
    let sunrise = new Date(data.sys.sunrise * 1000);
    let sunset = new Date(data.sys.sunset * 1000);

    console.log('sunrise: ', sunrise);
    console.log('sunset: ', sunset);

    //wind data
    console.log(data.wind.deg);
    console.log(data.wind.speed);
    
}

function notFound(){
    console.log('not found')
}

