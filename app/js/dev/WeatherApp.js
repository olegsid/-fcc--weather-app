class WeatherApp {
	constructor(cityName, temperature, countryCode, weatherDescription) {
		this.cityName = cityName;
		this.temperature = temperature;
		this.countryCode = countryCode;
		this.weatherDescription = weatherDescription;
	}

	setProperty(property, value, decorator) {
		property && displayData(this[property], value, decorator);
	}
}
function displayData(el, html, decorator) {
	el.innerHTML = decorator ? decorator(html) : html;
}

module.exports = WeatherApp;
