let appId = 'd02330d706b1f70a6502742e13c06a25';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer){
    switch(resultFromServer.weather[0].main){
        case 'Clear':
            document.body.style.background = 'url("clear.jpg")';
        break;
        case 'Clouds':
        case 'Haze':
            document.body.style.background = 'url("cloudy.jpg")';
        break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.background = 'url("rain.jpg")';
        break;
        case 'Thunderstrome':
            document.body.style.background = 'url("strome.jpg")';
        break;
        case 'Snow':
            document.body.style.background = 'url("snow.jpg")';
        break;
        default:
            document.body.style.background = 'url("default.jpg")';
        break;
    }
    // console.log(resultFromServer);
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
    setPosition();
}

function setPosition(){
    let weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
}) 