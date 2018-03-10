const units = {
	CELSIUS: 'CELSIUS',
	KELVIN: 'KELVIN'
};

class WeatherApp {
	constructor(cityName, temperature, countryCode, weatherDescription, switcher, unitType = units.CELSIUS) {
		this.cityName = cityName;
		this.temperature = temperature;
		this.countryCode = countryCode;
		this.weatherDescription = weatherDescription;
		this.switcher = switcher;
		this.unitType = unitType;

		switcher.addEventListener('click', () => this.onSwitch());
	}

	setProperty(property, value, decorator) {
		property && displayData(this[property], value, decorator);
	}

	unitDecorator(temp, unitType) {
		switch (unitType) {
			case units.CELSIUS:
				return `${Math.floor(temp - 273.15)} <b>°C</b>`;
			case units.KELVIN:
				return `${Math.floor(temp)} <b>°K</b>`;
		}
	}

	setWeather(fn) {
		this.run = fn;
		this.run();
	}

	onSwitch() {
		switch (this.unitType) {
			case units.CELSIUS:
				this.unitType = units.KELVIN;
				break;
			case units.KELVIN:
				this.unitType = units.CELSIUS;
				break;
		}
		this.run();
	}
}
function displayData(el, html, decorator) {
	el.innerHTML = decorator ? decorator(html) : html;
}

module.exports = WeatherApp;
