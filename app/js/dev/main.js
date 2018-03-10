const WeatherApp = require('./WeatherApp')

const geolocationExist = () => 'geolocation' in navigator

const createUrl = (appidKey) => (lat, lon) =>
	`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${appidKey}`

const getPosition = new Promise(
	(resolve, reject) => geolocationExist() && navigator.geolocation.getCurrentPosition((position) => resolve(position))
)

const appidKey = '7ad1836fa682671c36d5a02040d194f4';

let app = new WeatherApp(
	document.getElementsByClassName('city-name')[0],
	document.getElementsByClassName('temperature')[0],
	document.getElementsByClassName('country-code')[0],
	document.getElementsByClassName('weather-description')[0],
	document.getElementsByClassName('switcher')[0]
);

app.setWeather(() => {
	getPosition
		.then((pos) => createUrl(appidKey)(pos.coords.latitude, pos.coords.longitude))
		.then((url) => fetch(url))
		.then((response) => response.json())
		.then((obj) => {
			app.setProperty('cityName', obj.name)
			app.setProperty('countryCode', obj.sys.country)
			app.setProperty('temperature', obj.main.temp, (temp) => app.unitDecorator(temp, app.unitType))
			app.setProperty('weatherDescription', obj.weather[0].description, (text) => text[0].toUpperCase() + text.slice(1))
		});
});
