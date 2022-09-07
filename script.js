function mainPage(){
    const content = document.createElement('div');
    content.setAttribute('id', 'content');

    const timeContent = document.createElement('div');
    timeContent.setAttribute('id', 'time');

    const timeSlot = document.createElement('div');
    timeSlot.classList.add('time-slot');

    const currentTime = document.createElement('div');
    currentTime.setAttribute('id','current-time');
    currentTime.classList.add('main-page-time');

    const currentAMorPM = document.createElement('div');
    currentAMorPM.setAttribute('id','current-am-or-pm');
    currentAMorPM.classList.add('main-page-am-or-pm');

    timeSlot.appendChild(currentTime);
    timeSlot.appendChild(currentAMorPM);

    const searchLocationSpan = document.createElement('span');
    searchLocationSpan.classList.add('search-location-span');

    const searchLocation = document.createElement('input');
    searchLocation.setAttribute('type', 'search');
    searchLocation.setAttribute('id', 'search-location');
    searchLocation.setAttribute('autocomplete', 'off');
    searchLocation.setAttribute('placeholder', 'search');

    const searchLocationBtn = document.createElement('button');
    searchLocationBtn.setAttribute('type', 'button');
    searchLocationBtn.setAttribute('id', 'search-location-button');

    searchLocation.onkeydown = function(e){
      if (e.key === 'Enter') {
        updateTemp(searchLocation);
      }
    }
    searchLocationBtn.onclick = function(){
        
        updateTemp(searchLocation);
    }

    searchLocationSpan.appendChild(searchLocation);
    searchLocationSpan.appendChild(searchLocationBtn);

    timeContent.appendChild(timeSlot);
    timeContent.appendChild(searchLocationSpan)

    content.appendChild(timeContent);
    
    return content;
}

document.body.appendChild(mainPage());


//add animated list
function getRandomInt(max, floor) {
  return Math.floor(Math.random() * max + floor);
}


const animatedList = document.createElement('ul');
animatedList.classList.add('shapes');
    for(let i = 0; i<100; i++){
        const shapeDiv = document.createElement('li');
        shapeDiv.style.right = getRandomInt(80, 0)+'%';
        shapeDiv.style.left = getRandomInt(80, 0)+'%';
        shapeDiv.style.top = getRandomInt(80, 0)+'vh';
        shapeDiv.style.width = shapeDiv.style.height = getRandomInt(50, 30)+'px';
        shapeDiv.style.animationDuration = getRandomInt(10,2)+'s';
        animatedList.appendChild(shapeDiv);

    }

document.body.appendChild(animatedList);


//time set
function startTime() {
    const placeTime = document.querySelector('.place-time');
    const placeTimePic = document.querySelector('.place-time-pic');

    const currentTime = document.getElementById('current-time');
    const currentAMorPM = document.getElementById('current-am-or-pm');
    let today = new Date(), h = today.getHours(), m = today.getMinutes();
    let ampm = h > 12 ? 'pm': 'am';
    h = h % 12;
    h = h ? h: h = 12;
    h = checkTime(h);
    m = checkTime(m);
    placeTime!=null?placeTime.textContent = h + ':' + m+' '+ampm: 0;
    currentTime!=null?currentTime.textContent = h + ':' + m:0;
    currentAMorPM!=null?currentAMorPM.textContent = ampm:0;
    setTimeout(startTime, 1000);  
    
}
function checkTime(i) {
  return (i < 10) ? '0' + i : i;
}
startTime();

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
  "dt":"1662358153",
  "weather":[{
    "id":"502",
    "main": "rain",
    "description": "light rain",
    "icon":"09d"
  }],
  "wind":{
    "deg":"250",
    "speed":"21.85"
  }
}

//api call to openweathermap url:  https://openweathermap.org/
//updateTemp();
async function updateTemp(location) {
  
    const  currContent = document.getElementById('content');
    while (currContent.hasChildNodes()){
      currContent.removeChild(currContent.lastChild);
    }
 
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+location.value+'&appid=eca5ec86a08e6a56a853ad00606412d8&units=metric');
    const data = await response.json();
    
    if (response.ok) {
      currContent.appendChild(locationFound(data));
    } else {
      currContent.appendChild(notFound());
    }
    

    //currContent.appendChild(locationFound(testData));
  

  }


function locationFound(data){

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
    placeName.classList.add('place');
    placeName.textContent = data.name;
    
    const placeCountry = document.createElement('div');
    placeCountry.classList.add('place-country');
    placeCountry.classList.add('place');
    placeCountry.textContent = data.sys.country;

    //coordinates

    const placeLong = document.createElement('div');
    placeLong.classList.add('place-long');
    placeLong.classList.add('place');
    placeLong.textContent = 'lon: '+data.coord.lon;

    const placeLat = document.createElement('div');
    placeLat.classList.add('place-lat');
    placeLat.classList.add('place');
    placeLat.textContent = 'lat: '+data.coord.lat;

    placeData.appendChild(placeName);
    placeData.appendChild(placeCountry);
    placeData.appendChild(placeLong);
    placeData.appendChild(placeLat);
    

    //temperature farenheit

    const placeTempWeather = document.createElement('div');
    placeTempWeather.classList.add('place-temp-weather');

    const placeTemp = document.createElement('div');
    placeTemp.classList.add('place-temp');

    const placeTempNow = document.createElement('div');
    placeTempNow.classList.add('place-temp-now');
    placeTempNow.classList.add('place');
    placeTempNow.textContent = Math.round(data.main.temp)+'°C';

    let ForC = 0;
    placeTempNow.onclick = function(){
      if(!ForC){
        let faren = (data.main.temp * 1.8) + 32;
        placeTempNow.textContent = Math.round(faren)+'°F';
        ForC = 1;
      }else{
        placeTempNow.textContent = Math.round(data.main.temp)+'°C';
        ForC = 0;
      }
      
    }

    
    const placeHumid = document.createElement('div');
    placeHumid.classList.add('place-humid');
    placeHumid.classList.add('place');
    placeHumid.textContent = 'Humidity: '+data.main.humidity+'%';
    
    placeTemp.appendChild(placeTempNow);
    placeTemp.appendChild(placeHumid);

    
    //weather

    const placeWeather = document.createElement('div');
    placeWeather.classList.add('place-weather');
    placeWeather.classList.add('place');

    const placeWeatherPic = document.createElement('div');
    placeWeatherPic.classList.add('place-weather-pic');
    placeWeatherPic.style.backgroundImage ='url(./assets/weather-conditions/'+data.weather[0].icon+'.svg)';


    const placeWeatherDesc = document.createElement('div');
    placeWeatherDesc.classList.add('place-weather-desc');;
    placeWeatherDesc.textContent = data.weather[0].description;

    placeWeather.appendChild(placeWeatherPic);
    placeWeather.appendChild(placeWeatherDesc);

    placeTempWeather.appendChild(placeWeather);
    placeTempWeather.appendChild(placeTemp);
    //placeTempWeatherWind.appendChild(placeWind);
    //placeTempHumid.appendChild(placeHumid);

    sideA.appendChild(placeData);
    sideA.appendChild(placeTempWeather);

    //side B Div
    const sideB = document.createElement('div');
    sideB.classList.add('side-b');
    //sunrise, sunset
    let sunrise = new Date(data.sys.sunrise * 1000);
    let sunset = new Date(data.sys.sunset * 1000);
  
    function setTime(date){
      date==null?date = new Date():0;
      let hours = date.getHours(), minutes = date.getMinutes();
      let amorpm = hours > 12 ? 'pm':'am';
      hours = hours % 12;
      hours = hours ? hours : hours = 12;

      hours = checkTime(hours);
      minutes = checkTime(minutes);

      return hours+':'+minutes+' '+amorpm;
    }

    //sunrise
    const placeSunrise = document.createElement('div');
    placeSunrise.classList.add('place-sunrise');
    placeSunrise.classList.add('place-sunrise-sunset-div');
    placeSunrise.classList.add('place');

    const placeSunrisePic = document.createElement('div');
    placeSunrisePic.classList.add('place-sunrise-pic');

    const placeSunriseTime = document.createElement('div');
    placeSunriseTime.classList.add('place-sunrise-time');
    placeSunriseTime.textContent = setTime(sunrise);

    placeSunrise.appendChild(placeSunrisePic);
    placeSunrise.appendChild(placeSunriseTime);
    //sunset
    const placeSunset = document.createElement('div');
    placeSunset.classList.add('place-sunset');
    placeSunset.classList.add('place-sunrise-sunset-div');
    placeSunset.classList.add('place');

    const placeSunsetPic = document.createElement('div');
    placeSunsetPic.classList.add('place-sunset-pic');

    const placeSunsetTime = document.createElement('div');
    placeSunsetTime.classList.add('place-sunset-time');
    placeSunsetTime.textContent = setTime(sunset);

    placeSunset.appendChild(placeSunsetPic);
    placeSunset.appendChild(placeSunsetTime);
    //current wind
    const placeWind = document.createElement('div');
    placeWind.classList.add('place-wind');
    placeWind.classList.add('place');

    const placeWindPic = document.createElement('div');
    placeWindPic.classList.add('place-wind-pic');

    const placeWindData = document.createElement('div');
    placeWindData.classList.add('place-wind-data');

    const placeWindSpeed = document.createElement('div');
    placeWindSpeed.classList.add('place-wind-speed');
    placeWindSpeed.textContent = 'Speed: '+data.wind.speed;

    const placeWindDeg = document.createElement('div');
    placeWindDeg.classList.add('place-wind-deg');
    placeWindDeg.textContent = 'Deg: '+data.wind.deg;

    const placeWindGust = document.createElement('div');
    placeWindGust.classList.add('place-wind-gust');
    placeWindGust.textContent = 'Gust: '+data.wind.gust;

    data.wind.speed!=null?placeWindData.appendChild(placeWindSpeed):0;
    data.wind.deg!=null?placeWindData.appendChild(placeWindDeg):0;
    data.wind.gust!=null?placeWindData.appendChild(placeWindGust):0;

    placeWind.appendChild(placeWindPic);
    placeWind.appendChild(placeWindData);


    //return home button
    const returnBack = document.createElement('button');
    returnBack.setAttribute('type', 'button');
    returnBack.classList.add('return-back');

    returnBack.onclick = function(){
      const  currContent = document.getElementById('content');
      while (currContent.hasChildNodes()){
        currContent.removeChild(currContent.lastChild);
      }

      currContent.appendChild(mainPage());
      startTime();
    }

    sideB.appendChild(placeSunrise);
    sideB.appendChild(placeSunset);
    //sideB.appendChild(placeTimeData);
    sideB.appendChild(placeWind); 
    sideB.appendChild(returnBack); 
    
    

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
    sideA!=null?sideA.style.width = '0':0;
    sideB!=null?sideB.style.width = '90vmin':0;
  }
  if (touchendX > touchstartX && window.innerWidth < 700){
    sideB!=null?sideB.style.width = '0':0;
    sideA!=null?sideA.style.width = '90vmin':0;
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
  sideA!=null?sideA.style.width = '':0;
  sideB!=null?sideB.style.width = '':0;
 
});
