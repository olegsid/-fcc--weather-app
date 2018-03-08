(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WeatherApp = function () {
	function WeatherApp(cityName, temperature, countryCode, currentWeather) {
		_classCallCheck(this, WeatherApp);

		this.cityName = cityName;
		this.temperature = temperature;
		this.countryCode = countryCode;
		this.currentWeather = currentWeather;
	}

	_createClass(WeatherApp, [{
		key: "setCityName",
		value: function setCityName(value, fn) {
			setData(this.cityName, value, fn);
		}
	}, {
		key: "setTemperature",
		value: function setTemperature(value, fn) {
			setData(this.temperature, value, fn);
		}
	}, {
		key: "setCountryCode",
		value: function setCountryCode(value, fn) {
			setData(this.countryCode, value, fn);
		}
	}, {
		key: "setCurrentWeather",
		value: function setCurrentWeather(value, fn) {
			setData(this.currentWeather, value, fn);
		}
	}]);

	return WeatherApp;
}();

function setData(el, html, decorator) {
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

var getGeoLocationPosition = new Promise(function (resolve, reject) {
	if (geolocationExist()) navigator.geolocation.getCurrentPosition(function (position) {
		return resolve(position);
	});
});

var appidKey = '7ad1836fa682671c36d5a02040d194f4';

var weatherApp = new WeatherApp(document.getElementsByClassName('city-name')[0], document.getElementsByClassName('temperature')[0], document.getElementsByClassName('country-code')[0], document.getElementsByClassName('weather-description')[0]);

getGeoLocationPosition.then(function (pos) {
	return createUrl(appidKey)(pos.coords.latitude, pos.coords.longitude);
}).then(function (url) {
	return fetch(url);
}).then(function (responce) {
	return responce.json();
}).then(function (obj) {
	weatherApp.setCityName(obj.name);
	weatherApp.setCountryCode(obj.sys.country);
	weatherApp.setTemperature(obj.main.temp, function (temp) {
		return Math.floor(temp - 273.15) + ' \xB0C';
	});
	weatherApp.setCurrentWeather(obj.weather[0].description, function (text) {
		return text[0].toUpperCase() + text.slice(1);
	});
});

},{"./WeatherApp":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvZGV2L1dlYXRoZXJBcHAuanMiLCJhcHAvanMvZGV2L21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7SUNBTSxVO0FBQ0wscUJBQVksUUFBWixFQUFzQixXQUF0QixFQUFtQyxXQUFuQyxFQUFnRCxjQUFoRCxFQUFnRTtBQUFBOztBQUMvRCxPQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxPQUFLLFdBQUwsR0FBbUIsV0FBbkI7QUFDQSxPQUFLLFdBQUwsR0FBbUIsV0FBbkI7QUFDQSxPQUFLLGNBQUwsR0FBc0IsY0FBdEI7QUFDQTs7Ozs4QkFFVyxLLEVBQU8sRSxFQUFJO0FBQ3RCLFdBQVEsS0FBSyxRQUFiLEVBQXVCLEtBQXZCLEVBQThCLEVBQTlCO0FBQ0E7OztpQ0FFYyxLLEVBQU8sRSxFQUFJO0FBQ3pCLFdBQVEsS0FBSyxXQUFiLEVBQTBCLEtBQTFCLEVBQWlDLEVBQWpDO0FBQ0E7OztpQ0FFYyxLLEVBQU8sRSxFQUFJO0FBQ3pCLFdBQVEsS0FBSyxXQUFiLEVBQTBCLEtBQTFCLEVBQWlDLEVBQWpDO0FBQ0E7OztvQ0FFaUIsSyxFQUFPLEUsRUFBSTtBQUM1QixXQUFRLEtBQUssY0FBYixFQUE2QixLQUE3QixFQUFvQyxFQUFwQztBQUNBOzs7Ozs7QUFFRixTQUFTLE9BQVQsQ0FBaUIsRUFBakIsRUFBcUIsSUFBckIsRUFBMkIsU0FBM0IsRUFBc0M7QUFDckMsSUFBRyxTQUFILEdBQWUsWUFBWSxVQUFVLElBQVYsQ0FBWixHQUE4QixJQUE3QztBQUNBOztBQUVELE9BQU8sT0FBUCxHQUFpQixVQUFqQjs7Ozs7QUM1QkEsSUFBTSxhQUFhLFFBQVEsY0FBUixDQUFuQjs7QUFFQSxJQUFNLG1CQUFtQixTQUFuQixnQkFBbUI7QUFBQSxRQUFNLGlCQUFpQixTQUF2QjtBQUFBLENBQXpCOztBQUVBLElBQU0sWUFBWSxTQUFaLFNBQVksQ0FBQyxRQUFEO0FBQUEsUUFBYyxVQUFDLEdBQUQsRUFBTSxHQUFOO0FBQUEsa0VBQ3dCLEdBRHhCLGFBQ21DLEdBRG5DLGVBQ2dELFFBRGhEO0FBQUEsRUFBZDtBQUFBLENBQWxCOztBQUdBLElBQU0seUJBQXlCLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDL0QsS0FBSSxrQkFBSixFQUF3QixVQUFVLFdBQVYsQ0FBc0Isa0JBQXRCLENBQXlDLFVBQUMsUUFBRDtBQUFBLFNBQWMsUUFBUSxRQUFSLENBQWQ7QUFBQSxFQUF6QztBQUN4QixDQUY4QixDQUEvQjs7QUFJQSxJQUFNLFdBQVcsa0NBQWpCOztBQUVBLElBQUksYUFBYSxJQUFJLFVBQUosQ0FDaEIsU0FBUyxzQkFBVCxDQUFnQyxXQUFoQyxFQUE2QyxDQUE3QyxDQURnQixFQUVoQixTQUFTLHNCQUFULENBQWdDLGFBQWhDLEVBQStDLENBQS9DLENBRmdCLEVBR2hCLFNBQVMsc0JBQVQsQ0FBZ0MsY0FBaEMsRUFBZ0QsQ0FBaEQsQ0FIZ0IsRUFJaEIsU0FBUyxzQkFBVCxDQUFnQyxxQkFBaEMsRUFBdUQsQ0FBdkQsQ0FKZ0IsQ0FBakI7O0FBT0EsdUJBQ0UsSUFERixDQUNPLFVBQUMsR0FBRDtBQUFBLFFBQVMsVUFBVSxRQUFWLEVBQW9CLElBQUksTUFBSixDQUFXLFFBQS9CLEVBQXlDLElBQUksTUFBSixDQUFXLFNBQXBELENBQVQ7QUFBQSxDQURQLEVBRUUsSUFGRixDQUVPLFVBQUMsR0FBRDtBQUFBLFFBQVMsTUFBTSxHQUFOLENBQVQ7QUFBQSxDQUZQLEVBR0UsSUFIRixDQUdPLFVBQUMsUUFBRDtBQUFBLFFBQWMsU0FBUyxJQUFULEVBQWQ7QUFBQSxDQUhQLEVBSUUsSUFKRixDQUlPLFVBQUMsR0FBRCxFQUFTO0FBQ2QsWUFBVyxXQUFYLENBQXVCLElBQUksSUFBM0I7QUFDQSxZQUFXLGNBQVgsQ0FBMEIsSUFBSSxHQUFKLENBQVEsT0FBbEM7QUFDQSxZQUFXLGNBQVgsQ0FBMEIsSUFBSSxJQUFKLENBQVMsSUFBbkMsRUFBeUM7QUFBQSxTQUFXLEtBQUssS0FBTCxDQUFXLE9BQU8sTUFBbEIsQ0FBWDtBQUFBLEVBQXpDO0FBQ0EsWUFBVyxpQkFBWCxDQUE2QixJQUFJLE9BQUosQ0FBWSxDQUFaLEVBQWUsV0FBNUMsRUFBeUQ7QUFBQSxTQUFRLEtBQUssQ0FBTCxFQUFRLFdBQVIsS0FBd0IsS0FBSyxLQUFMLENBQVcsQ0FBWCxDQUFoQztBQUFBLEVBQXpEO0FBQ0EsQ0FURiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiY2xhc3MgV2VhdGhlckFwcCB7XHJcblx0Y29uc3RydWN0b3IoY2l0eU5hbWUsIHRlbXBlcmF0dXJlLCBjb3VudHJ5Q29kZSwgY3VycmVudFdlYXRoZXIpIHtcclxuXHRcdHRoaXMuY2l0eU5hbWUgPSBjaXR5TmFtZTtcclxuXHRcdHRoaXMudGVtcGVyYXR1cmUgPSB0ZW1wZXJhdHVyZTtcclxuXHRcdHRoaXMuY291bnRyeUNvZGUgPSBjb3VudHJ5Q29kZTtcclxuXHRcdHRoaXMuY3VycmVudFdlYXRoZXIgPSBjdXJyZW50V2VhdGhlcjtcclxuXHR9XHJcblxyXG5cdHNldENpdHlOYW1lKHZhbHVlLCBmbikge1xyXG5cdFx0c2V0RGF0YSh0aGlzLmNpdHlOYW1lLCB2YWx1ZSwgZm4pO1xyXG5cdH1cclxuXHJcblx0c2V0VGVtcGVyYXR1cmUodmFsdWUsIGZuKSB7XHJcblx0XHRzZXREYXRhKHRoaXMudGVtcGVyYXR1cmUsIHZhbHVlLCBmbik7XHJcblx0fVxyXG5cclxuXHRzZXRDb3VudHJ5Q29kZSh2YWx1ZSwgZm4pIHtcclxuXHRcdHNldERhdGEodGhpcy5jb3VudHJ5Q29kZSwgdmFsdWUsIGZuKTtcclxuXHR9XHJcblxyXG5cdHNldEN1cnJlbnRXZWF0aGVyKHZhbHVlLCBmbikge1xyXG5cdFx0c2V0RGF0YSh0aGlzLmN1cnJlbnRXZWF0aGVyLCB2YWx1ZSwgZm4pO1xyXG5cdH1cclxufVxyXG5mdW5jdGlvbiBzZXREYXRhKGVsLCBodG1sLCBkZWNvcmF0b3IpIHtcclxuXHRlbC5pbm5lckhUTUwgPSBkZWNvcmF0b3IgPyBkZWNvcmF0b3IoaHRtbCkgOiBodG1sXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gV2VhdGhlckFwcDtcclxuIiwiY29uc3QgV2VhdGhlckFwcCA9IHJlcXVpcmUoJy4vV2VhdGhlckFwcCcpO1xyXG5cclxuY29uc3QgZ2VvbG9jYXRpb25FeGlzdCA9ICgpID0+ICdnZW9sb2NhdGlvbicgaW4gbmF2aWdhdG9yO1xyXG5cclxuY29uc3QgY3JlYXRlVXJsID0gKGFwcGlkS2V5KSA9PiAobGF0LCBsb24pID0+XHJcblx0YGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZBUFBJRD0ke2FwcGlkS2V5fWA7XHJcblxyXG5jb25zdCBnZXRHZW9Mb2NhdGlvblBvc2l0aW9uID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdGlmIChnZW9sb2NhdGlvbkV4aXN0KCkpIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvc2l0aW9uKSA9PiByZXNvbHZlKHBvc2l0aW9uKSk7XHJcbn0pO1xyXG5cclxuY29uc3QgYXBwaWRLZXkgPSAnN2FkMTgzNmZhNjgyNjcxYzM2ZDVhMDIwNDBkMTk0ZjQnO1xyXG5cclxubGV0IHdlYXRoZXJBcHAgPSBuZXcgV2VhdGhlckFwcChcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjaXR5LW5hbWUnKVswXSxcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0ZW1wZXJhdHVyZScpWzBdLFxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvdW50cnktY29kZScpWzBdLFxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dlYXRoZXItZGVzY3JpcHRpb24nKVswXVxyXG4pO1xyXG5cclxuZ2V0R2VvTG9jYXRpb25Qb3NpdGlvblxyXG5cdC50aGVuKChwb3MpID0+IGNyZWF0ZVVybChhcHBpZEtleSkocG9zLmNvb3Jkcy5sYXRpdHVkZSwgcG9zLmNvb3Jkcy5sb25naXR1ZGUpKVxyXG5cdC50aGVuKCh1cmwpID0+IGZldGNoKHVybCkpXHJcblx0LnRoZW4oKHJlc3BvbmNlKSA9PiByZXNwb25jZS5qc29uKCkpXHJcblx0LnRoZW4oKG9iaikgPT4ge1xyXG5cdFx0d2VhdGhlckFwcC5zZXRDaXR5TmFtZShvYmoubmFtZSk7XHJcblx0XHR3ZWF0aGVyQXBwLnNldENvdW50cnlDb2RlKG9iai5zeXMuY291bnRyeSk7XHJcblx0XHR3ZWF0aGVyQXBwLnNldFRlbXBlcmF0dXJlKG9iai5tYWluLnRlbXAsIHRlbXAgPT4gYCR7TWF0aC5mbG9vcih0ZW1wIC0gMjczLjE1KX0gwrBDYCk7XHJcblx0XHR3ZWF0aGVyQXBwLnNldEN1cnJlbnRXZWF0aGVyKG9iai53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLCB0ZXh0ID0+IHRleHRbMF0udG9VcHBlckNhc2UoKSArIHRleHQuc2xpY2UoMSkpO1xyXG5cdH0pO1xyXG4iXX0=
