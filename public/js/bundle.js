(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var units = {
	CELSIUS: 'CELSIUS',
	KELVIN: 'KELVIN'
};

var WeatherApp = function () {
	function WeatherApp(cityName, temperature, countryCode, weatherDescription, switcher) {
		var _this = this;

		var unitType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : units.CELSIUS;

		_classCallCheck(this, WeatherApp);

		this.cityName = cityName;
		this.temperature = temperature;
		this.countryCode = countryCode;
		this.weatherDescription = weatherDescription;
		this.switcher = switcher;
		this.unitType = unitType;

		switcher.addEventListener('click', function () {
			return _this.onSwitch();
		});
	}

	_createClass(WeatherApp, [{
		key: 'setProperty',
		value: function setProperty(property, value, decorator) {
			property && displayData(this[property], value, decorator);
		}
	}, {
		key: 'unitDecorator',
		value: function unitDecorator(temp, unitType) {
			switch (unitType) {
				case units.CELSIUS:
					return Math.floor(temp - 273.15) + ' <b>\xB0C</b>';
				case units.KELVIN:
					return Math.floor(temp) + ' <b>\xB0K</b>';
			}
		}
	}, {
		key: 'setWeather',
		value: function setWeather(fn) {
			this.run = fn;
			this.run();
		}
	}, {
		key: 'onSwitch',
		value: function onSwitch() {
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
	}]);

	return WeatherApp;
}();

function displayData(el, html, decorator) {
	el.innerHTML = decorator ? decorator(html) : html;
}

module.exports = WeatherApp;

},{}],2:[function(require,module,exports){
'use strict';

var WeatherApp = require('./WeatherApp');

var geolocationExist = function geolocationExist() {
	return 'geolocation' in navigator;
};

var createUrl = function createUrl(appidKey) {
	return function (lat, lon) {
		return 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + appidKey;
	};
};

var getPosition = new Promise(function (resolve, reject) {
	return geolocationExist() && navigator.geolocation.getCurrentPosition(function (position) {
		return resolve(position);
	});
});

var appidKey = '7ad1836fa682671c36d5a02040d194f4';

var app = new WeatherApp(document.getElementsByClassName('city-name')[0], document.getElementsByClassName('temperature')[0], document.getElementsByClassName('country-code')[0], document.getElementsByClassName('weather-description')[0], document.getElementsByClassName('switcher')[0]);

app.setWeather(function () {
	getPosition.then(function (pos) {
		return createUrl(appidKey)(pos.coords.latitude, pos.coords.longitude);
	}).then(function (url) {
		return fetch(url);
	}).then(function (response) {
		return response.json();
	}).then(function (obj) {
		app.setProperty('cityName', obj.name);
		app.setProperty('countryCode', obj.sys.country);
		app.setProperty('temperature', obj.main.temp, function (temp) {
			return app.unitDecorator(temp, app.unitType);
		});
		app.setProperty('weatherDescription', obj.weather[0].description, function (text) {
			return text[0].toUpperCase() + text.slice(1);
		});
	});
});

},{"./WeatherApp":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvZGV2L1dlYXRoZXJBcHAuanMiLCJhcHAvanMvZGV2L21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxJQUFNLFFBQVE7QUFDYixVQUFTLFNBREk7QUFFYixTQUFRO0FBRkssQ0FBZDs7SUFLTSxVO0FBQ0wscUJBQVksUUFBWixFQUFzQixXQUF0QixFQUFtQyxXQUFuQyxFQUFnRCxrQkFBaEQsRUFBb0UsUUFBcEUsRUFBd0c7QUFBQTs7QUFBQSxNQUExQixRQUEwQix1RUFBZixNQUFNLE9BQVM7O0FBQUE7O0FBQ3ZHLE9BQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLE9BQUssV0FBTCxHQUFtQixXQUFuQjtBQUNBLE9BQUssV0FBTCxHQUFtQixXQUFuQjtBQUNBLE9BQUssa0JBQUwsR0FBMEIsa0JBQTFCO0FBQ0EsT0FBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsT0FBSyxRQUFMLEdBQWdCLFFBQWhCOztBQUVBLFdBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUM7QUFBQSxVQUFNLE1BQUssUUFBTCxFQUFOO0FBQUEsR0FBbkM7QUFDQTs7Ozs4QkFFVyxRLEVBQVUsSyxFQUFPLFMsRUFBVztBQUN2QyxlQUFZLFlBQVksS0FBSyxRQUFMLENBQVosRUFBNEIsS0FBNUIsRUFBbUMsU0FBbkMsQ0FBWjtBQUNBOzs7Z0NBRWEsSSxFQUFNLFEsRUFBVTtBQUM3QixXQUFRLFFBQVI7QUFDQyxTQUFLLE1BQU0sT0FBWDtBQUNDLFlBQVUsS0FBSyxLQUFMLENBQVcsT0FBTyxNQUFsQixDQUFWO0FBQ0QsU0FBSyxNQUFNLE1BQVg7QUFDQyxZQUFVLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBVjtBQUpGO0FBTUE7Ozs2QkFFVSxFLEVBQUk7QUFDZCxRQUFLLEdBQUwsR0FBVyxFQUFYO0FBQ0EsUUFBSyxHQUFMO0FBQ0E7Ozs2QkFFVTtBQUNWLFdBQVEsS0FBSyxRQUFiO0FBQ0MsU0FBSyxNQUFNLE9BQVg7QUFDQyxVQUFLLFFBQUwsR0FBZ0IsTUFBTSxNQUF0QjtBQUNBO0FBQ0QsU0FBSyxNQUFNLE1BQVg7QUFDQyxVQUFLLFFBQUwsR0FBZ0IsTUFBTSxPQUF0QjtBQUNBO0FBTkY7QUFRQSxRQUFLLEdBQUw7QUFDQTs7Ozs7O0FBRUYsU0FBUyxXQUFULENBQXFCLEVBQXJCLEVBQXlCLElBQXpCLEVBQStCLFNBQS9CLEVBQTBDO0FBQ3pDLElBQUcsU0FBSCxHQUFlLFlBQVksVUFBVSxJQUFWLENBQVosR0FBOEIsSUFBN0M7QUFDQTs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsVUFBakI7Ozs7O0FDbkRBLElBQU0sYUFBYSxRQUFRLGNBQVIsQ0FBbkI7O0FBRUEsSUFBTSxtQkFBbUIsU0FBbkIsZ0JBQW1CO0FBQUEsUUFBTSxpQkFBaUIsU0FBdkI7QUFBQSxDQUF6Qjs7QUFFQSxJQUFNLFlBQVksU0FBWixTQUFZLENBQUMsUUFBRDtBQUFBLFFBQWMsVUFBQyxHQUFELEVBQU0sR0FBTjtBQUFBLGtFQUN3QixHQUR4QixhQUNtQyxHQURuQyxlQUNnRCxRQURoRDtBQUFBLEVBQWQ7QUFBQSxDQUFsQjs7QUFHQSxJQUFNLGNBQWMsSUFBSSxPQUFKLENBQ25CLFVBQUMsT0FBRCxFQUFVLE1BQVY7QUFBQSxRQUFxQixzQkFBc0IsVUFBVSxXQUFWLENBQXNCLGtCQUF0QixDQUF5QyxVQUFDLFFBQUQ7QUFBQSxTQUFjLFFBQVEsUUFBUixDQUFkO0FBQUEsRUFBekMsQ0FBM0M7QUFBQSxDQURtQixDQUFwQjs7QUFJQSxJQUFNLFdBQVcsa0NBQWpCOztBQUVBLElBQUksTUFBTSxJQUFJLFVBQUosQ0FDVCxTQUFTLHNCQUFULENBQWdDLFdBQWhDLEVBQTZDLENBQTdDLENBRFMsRUFFVCxTQUFTLHNCQUFULENBQWdDLGFBQWhDLEVBQStDLENBQS9DLENBRlMsRUFHVCxTQUFTLHNCQUFULENBQWdDLGNBQWhDLEVBQWdELENBQWhELENBSFMsRUFJVCxTQUFTLHNCQUFULENBQWdDLHFCQUFoQyxFQUF1RCxDQUF2RCxDQUpTLEVBS1QsU0FBUyxzQkFBVCxDQUFnQyxVQUFoQyxFQUE0QyxDQUE1QyxDQUxTLENBQVY7O0FBUUEsSUFBSSxVQUFKLENBQWUsWUFBTTtBQUNwQixhQUNFLElBREYsQ0FDTyxVQUFDLEdBQUQ7QUFBQSxTQUFTLFVBQVUsUUFBVixFQUFvQixJQUFJLE1BQUosQ0FBVyxRQUEvQixFQUF5QyxJQUFJLE1BQUosQ0FBVyxTQUFwRCxDQUFUO0FBQUEsRUFEUCxFQUVFLElBRkYsQ0FFTyxVQUFDLEdBQUQ7QUFBQSxTQUFTLE1BQU0sR0FBTixDQUFUO0FBQUEsRUFGUCxFQUdFLElBSEYsQ0FHTyxVQUFDLFFBQUQ7QUFBQSxTQUFjLFNBQVMsSUFBVCxFQUFkO0FBQUEsRUFIUCxFQUlFLElBSkYsQ0FJTyxVQUFDLEdBQUQsRUFBUztBQUNkLE1BQUksV0FBSixDQUFnQixVQUFoQixFQUE0QixJQUFJLElBQWhDO0FBQ0EsTUFBSSxXQUFKLENBQWdCLGFBQWhCLEVBQStCLElBQUksR0FBSixDQUFRLE9BQXZDO0FBQ0EsTUFBSSxXQUFKLENBQWdCLGFBQWhCLEVBQStCLElBQUksSUFBSixDQUFTLElBQXhDLEVBQThDLFVBQUMsSUFBRDtBQUFBLFVBQVUsSUFBSSxhQUFKLENBQWtCLElBQWxCLEVBQXdCLElBQUksUUFBNUIsQ0FBVjtBQUFBLEdBQTlDO0FBQ0EsTUFBSSxXQUFKLENBQWdCLG9CQUFoQixFQUFzQyxJQUFJLE9BQUosQ0FBWSxDQUFaLEVBQWUsV0FBckQsRUFBa0UsVUFBQyxJQUFEO0FBQUEsVUFBVSxLQUFLLENBQUwsRUFBUSxXQUFSLEtBQXdCLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBbEM7QUFBQSxHQUFsRTtBQUNBLEVBVEY7QUFVQSxDQVhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCJjb25zdCB1bml0cyA9IHtcclxuXHRDRUxTSVVTOiAnQ0VMU0lVUycsXHJcblx0S0VMVklOOiAnS0VMVklOJ1xyXG59O1xyXG5cclxuY2xhc3MgV2VhdGhlckFwcCB7XHJcblx0Y29uc3RydWN0b3IoY2l0eU5hbWUsIHRlbXBlcmF0dXJlLCBjb3VudHJ5Q29kZSwgd2VhdGhlckRlc2NyaXB0aW9uLCBzd2l0Y2hlciwgdW5pdFR5cGUgPSB1bml0cy5DRUxTSVVTKSB7XHJcblx0XHR0aGlzLmNpdHlOYW1lID0gY2l0eU5hbWU7XHJcblx0XHR0aGlzLnRlbXBlcmF0dXJlID0gdGVtcGVyYXR1cmU7XHJcblx0XHR0aGlzLmNvdW50cnlDb2RlID0gY291bnRyeUNvZGU7XHJcblx0XHR0aGlzLndlYXRoZXJEZXNjcmlwdGlvbiA9IHdlYXRoZXJEZXNjcmlwdGlvbjtcclxuXHRcdHRoaXMuc3dpdGNoZXIgPSBzd2l0Y2hlcjtcclxuXHRcdHRoaXMudW5pdFR5cGUgPSB1bml0VHlwZTtcclxuXHJcblx0XHRzd2l0Y2hlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub25Td2l0Y2goKSk7XHJcblx0fVxyXG5cclxuXHRzZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUsIGRlY29yYXRvcikge1xyXG5cdFx0cHJvcGVydHkgJiYgZGlzcGxheURhdGEodGhpc1twcm9wZXJ0eV0sIHZhbHVlLCBkZWNvcmF0b3IpO1xyXG5cdH1cclxuXHJcblx0dW5pdERlY29yYXRvcih0ZW1wLCB1bml0VHlwZSkge1xyXG5cdFx0c3dpdGNoICh1bml0VHlwZSkge1xyXG5cdFx0XHRjYXNlIHVuaXRzLkNFTFNJVVM6XHJcblx0XHRcdFx0cmV0dXJuIGAke01hdGguZmxvb3IodGVtcCAtIDI3My4xNSl9IDxiPsKwQzwvYj5gO1xyXG5cdFx0XHRjYXNlIHVuaXRzLktFTFZJTjpcclxuXHRcdFx0XHRyZXR1cm4gYCR7TWF0aC5mbG9vcih0ZW1wKX0gPGI+wrBLPC9iPmA7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXRXZWF0aGVyKGZuKSB7XHJcblx0XHR0aGlzLnJ1biA9IGZuO1xyXG5cdFx0dGhpcy5ydW4oKTtcclxuXHR9XHJcblxyXG5cdG9uU3dpdGNoKCkge1xyXG5cdFx0c3dpdGNoICh0aGlzLnVuaXRUeXBlKSB7XHJcblx0XHRcdGNhc2UgdW5pdHMuQ0VMU0lVUzpcclxuXHRcdFx0XHR0aGlzLnVuaXRUeXBlID0gdW5pdHMuS0VMVklOO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIHVuaXRzLktFTFZJTjpcclxuXHRcdFx0XHR0aGlzLnVuaXRUeXBlID0gdW5pdHMuQ0VMU0lVUztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdHRoaXMucnVuKCk7XHJcblx0fVxyXG59XHJcbmZ1bmN0aW9uIGRpc3BsYXlEYXRhKGVsLCBodG1sLCBkZWNvcmF0b3IpIHtcclxuXHRlbC5pbm5lckhUTUwgPSBkZWNvcmF0b3IgPyBkZWNvcmF0b3IoaHRtbCkgOiBodG1sO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFdlYXRoZXJBcHA7XHJcbiIsImNvbnN0IFdlYXRoZXJBcHAgPSByZXF1aXJlKCcuL1dlYXRoZXJBcHAnKVxyXG5cclxuY29uc3QgZ2VvbG9jYXRpb25FeGlzdCA9ICgpID0+ICdnZW9sb2NhdGlvbicgaW4gbmF2aWdhdG9yXHJcblxyXG5jb25zdCBjcmVhdGVVcmwgPSAoYXBwaWRLZXkpID0+IChsYXQsIGxvbikgPT5cclxuXHRgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PSR7bGF0fSZsb249JHtsb259JkFQUElEPSR7YXBwaWRLZXl9YFxyXG5cclxuY29uc3QgZ2V0UG9zaXRpb24gPSBuZXcgUHJvbWlzZShcclxuXHQocmVzb2x2ZSwgcmVqZWN0KSA9PiBnZW9sb2NhdGlvbkV4aXN0KCkgJiYgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb24pID0+IHJlc29sdmUocG9zaXRpb24pKVxyXG4pXHJcblxyXG5jb25zdCBhcHBpZEtleSA9ICc3YWQxODM2ZmE2ODI2NzFjMzZkNWEwMjA0MGQxOTRmNCc7XHJcblxyXG5sZXQgYXBwID0gbmV3IFdlYXRoZXJBcHAoXHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2l0eS1uYW1lJylbMF0sXHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGVtcGVyYXR1cmUnKVswXSxcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb3VudHJ5LWNvZGUnKVswXSxcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3ZWF0aGVyLWRlc2NyaXB0aW9uJylbMF0sXHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3dpdGNoZXInKVswXVxyXG4pO1xyXG5cclxuYXBwLnNldFdlYXRoZXIoKCkgPT4ge1xyXG5cdGdldFBvc2l0aW9uXHJcblx0XHQudGhlbigocG9zKSA9PiBjcmVhdGVVcmwoYXBwaWRLZXkpKHBvcy5jb29yZHMubGF0aXR1ZGUsIHBvcy5jb29yZHMubG9uZ2l0dWRlKSlcclxuXHRcdC50aGVuKCh1cmwpID0+IGZldGNoKHVybCkpXHJcblx0XHQudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuXHRcdC50aGVuKChvYmopID0+IHtcclxuXHRcdFx0YXBwLnNldFByb3BlcnR5KCdjaXR5TmFtZScsIG9iai5uYW1lKVxyXG5cdFx0XHRhcHAuc2V0UHJvcGVydHkoJ2NvdW50cnlDb2RlJywgb2JqLnN5cy5jb3VudHJ5KVxyXG5cdFx0XHRhcHAuc2V0UHJvcGVydHkoJ3RlbXBlcmF0dXJlJywgb2JqLm1haW4udGVtcCwgKHRlbXApID0+IGFwcC51bml0RGVjb3JhdG9yKHRlbXAsIGFwcC51bml0VHlwZSkpXHJcblx0XHRcdGFwcC5zZXRQcm9wZXJ0eSgnd2VhdGhlckRlc2NyaXB0aW9uJywgb2JqLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sICh0ZXh0KSA9PiB0ZXh0WzBdLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnNsaWNlKDEpKVxyXG5cdFx0fSk7XHJcbn0pO1xyXG4iXX0=
