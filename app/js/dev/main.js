const WeatherApp = require('./WeatherApp');

const geolocationExist = () => 'geolocation' in navigator;

const createUrl = (appidKey) => (lat, lon) =>
	`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${appidKey}`;

const getPosition = new Promise(
	(resolve, reject) => geolocationExist() && navigator.geolocation.getCurrentPosition((position) => resolve(position))
);

const appidKey = '7ad1836fa682671c36d5a02040d194f4';

let weatherApp = new WeatherApp(
	document.getElementsByClassName('city-name')[0],
	document.getElementsByClassName('temperature')[0],
	document.getElementsByClassName('country-code')[0],
	document.getElementsByClassName('weather-description')[0]
);

getPosition
	.then((pos) => createUrl(appidKey)(pos.coords.latitude, pos.coords.longitude))
	.then((url) => fetch(url))
	.then((response) => response.json())
	.then((obj) => {
		weatherApp.setProperty('cityName', obj.name);
		weatherApp.setProperty('countryCode', obj.sys.country);
		weatherApp.setProperty('temperature', obj.main.temp, (temp) => `${Math.floor(temp - 273.15)} °C`);
		weatherApp.setProperty('weatherDescription', obj.weather[0].description, text => text[0].toUpperCase() + text.slice(1)
		);
	});
