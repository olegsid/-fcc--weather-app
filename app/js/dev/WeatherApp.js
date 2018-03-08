class WeatherApp {
	constructor(cityName, temperature, countryCode, currentWeather) {
		this.cityName = cityName;
		this.temperature = temperature;
		this.countryCode = countryCode;
		this.currentWeather = currentWeather;
	}

	setCityName(value, fn) {
		setData(this.cityName, value, fn);
	}

	setTemperature(value, fn) {
		setData(this.temperature, value, fn);
	}

	setCountryCode(value, fn) {
		setData(this.countryCode, value, fn);
	}

	setCurrentWeather(value, fn) {
		setData(this.currentWeather, value, fn);
	}
}
function setData(el, html, decorator) {
	el.innerHTML = decorator ? decorator(html) : html
}

module.exports = WeatherApp;
