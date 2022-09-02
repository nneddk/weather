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

//data for testing
let testData = {
  "name": "Caloocan",
  "coord":{
    "lat":  "14.6571",
    "lon": "120.9841"
  },
  "main":{
    "temp": "85.15",
    "humidity": "80"
  },
  "sys":{
    "country": "PH",
    "sunrise":  "1662068651",
    "sunset": "1662113286"
  },
  "weather":[{
    "main": "rain",
    "description": "light rain"
  }],
  "wind":{
    "deg":"250",
    "speed":"21.85"
  }
}

//api call to openweathermap url:  https://openweathermap.org/

async function updateTemp(location) {
    const  currContent = document.getElementById('content');
    while (currContent.hasChildNodes()){
      currContent.removeChild(currContent.lastChild);
    }
    /*
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+location.value+'&appid=eca5ec86a08e6a56a853ad00606412d8&units=imperial');
    const data = await response.json();
    
    if (response.ok) {
      currContent.appendChild(locationFound(data));
    } else {
      currContent.appendChild(notFound());
    }
    */
    currContent.appendChild(locationFound(testData));

  }


function locationFound(data){

    console.log(data);
    const contentFound = document.createElement('div');
    contentFound.classList.add('content-found');

    //side a div
    const sideA = document.createElement('div');
    sideA.classList.add('side-a');
    
    //place data div
    const placeData = document.createElement('div');
    placeData.classList.add('place-data');
    //city name, country

    const placeName = document.createElement('div');
    placeName.classList.add('place-name');
    placeName.textContent = data.name;
    
    const placeCountry = document.createElement('div');
    placeCountry.classList.add('place-country');
    placeCountry.textContent = data.sys.country;



    console.log('name: ', data.name);
    console.log('country: ', data.sys.country);

    //coordinates

    const placeLong = document.createElement('div');
    placeLong.classList.add('place-long');
    placeLong.classList.add('place');
    placeLong.textContent = data.coord.lon;

    const placeLat = document.createElement('div');
    placeLat.classList.add('place-lat');
    placeLat.classList.add('place');
    placeLat.textContent = data.coord.lat;
    
    console.log('long: ', data.coord.lon);
    console.log('lat: ', data.coord.lat);

    //temperature farenheit

    const placeTemp = document.createElement('div');
    placeTemp.classList.add('place-temp');
    placeTemp.classList.add('place');
    placeTemp.textContent = data.main.temp;

    console.log('temp: ', data.main.temp);
    console.log('humidity: ', data.main.humidity);

    //weather

    const placeWeather = document.createElement('div');
    placeWeather.classList.add('place-weather');
    placeWeather.classList.add('place');
    placeWeather.textContent = data.weather[0].description;
    console.log(data.weather[0].description);

    placeData.appendChild(placeName);
    placeData.appendChild(placeCountry);
    placeData.appendChild(placeLong);
    placeData.appendChild(placeLat);

    sideA.appendChild(placeData);
    sideA.appendChild(placeTemp);
    sideA.appendChild(placeWeather);

    //side B Div
    const sideB = document.createElement('div');
    sideB.classList.add('side-b');
    //sunrise, sunset
    let sunrise = new Date(data.sys.sunrise * 1000);
    let sunset = new Date(data.sys.sunset * 1000);

    console.log('sunrise: ', sunrise);
    console.log('sunset: ', sunset);
    //sunrise
    const placeSunrise = document.createElement('div');
    placeSunrise.classList.add('place-sunrise');
    placeSunrise.classList.add('place-sunrise-sunset-div');

    const placeSunrisePic = document.createElement('div');
    placeSunrisePic.classList.add('place-sunrise-pic');

    const placeSunriseTime = document.createElement('div');
    placeSunriseTime.classList.add('place');
    placeSunriseTime.textContent = sunrise;

    placeSunrise.appendChild(placeSunrisePic);
    placeSunrise.appendChild(placeSunriseTime);
    //sunset
    const placeSunset = document.createElement('div');
    placeSunset.classList.add('place-sunset');
    placeSunset.classList.add('place-sunrise-sunset-div');

    const placeSunsetPic = document.createElement('div');
    placeSunsetPic.classList.add('place-sunset-pic');

    const placeSunsetTime = document.createElement('div');
    placeSunsetTime.classList.add('place');
    placeSunsetTime.textContent = sunset;

    placeSunset.appendChild(placeSunsetPic);
    placeSunset.appendChild(placeSunsetTime);

    //humidity

    const placeHumid = document.createElement('div');
    placeHumid.classList.add('place-humid');
    placeHumid.classList.add('place');
    placeHumid.textContent = data.main.humidity;

    //wind data
    console.log(data.wind.deg);
    console.log(data.wind.speed);

    const placeWind = document.createElement('div');
    placeWind.classList.add('place-wind');

    const placeWindPic = document.createElement('div');
    placeWindPic.classList.add('place-wind-pic');

    const placeWindData = document.createElement('div');
    placeWindData.classList.add('place-wind-data');

    const placeWindDeg = document.createElement('div');
    placeWindDeg.classList.add('place-wind-deg');
    placeWindDeg.classList.add('place');
    placeWindDeg.textContent = data.wind.deg;

    const placeWindSpeed = document.createElement('div');
    placeWindSpeed.classList.add('place-wind-speed');
    placeWindSpeed.classList.add('place');
    placeWindSpeed.textContent = data.wind.speed;

    placeWindData.appendChild(placeWindDeg);
    placeWindData.appendChild(placeWindSpeed);

    placeWind.appendChild(placeWindPic);
    placeWind.appendChild(placeWindData);

    sideB.appendChild(placeSunrise);
    sideB.appendChild(placeSunset);

    sideB.appendChild(placeHumid);
    
    sideB.appendChild(placeWind);

    

    contentFound.appendChild(sideA);
    contentFound.appendChild(sideB);

    return contentFound;
}

function notFound(){
    const contentNotFound = document.createElement('div');
    contentNotFound.classList.add('content-not-found');
    contentNotFound.textContent = 'Uh oh, something went wrong'

    return contentNotFound;

}




//swipe checker for mobile view
let touchstartX = 0
let touchendX = 0
    
function checkDirection() {
  const sideA = document.querySelector('.side-a');
  const sideB = document.querySelector('.side-b');
  if (touchendX < touchstartX && window.innerWidth < 700){
    sideA.style.width = '0';
    sideB.style.width = '80vmin';
  }
  if (touchendX > touchstartX && window.innerWidth < 700){
    sideB.style.width = '0';
    sideA.style.width = '80vmin';
  }
}

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})

window.addEventListener("resize", function () {
  // check width and reset width so mobile view rotate doesnt mess up
  const sideA = document.querySelector('.side-a');
  const sideB = document.querySelector('.side-b');
  sideA.style.width = '';
  sideB.style.width = '';
 
});
