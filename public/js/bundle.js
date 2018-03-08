(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WeatherApp = function () {
	function WeatherApp(cityName, temperature, countryCode, weatherDescription) {
		_classCallCheck(this, WeatherApp);

		this.cityName = cityName;
		this.temperature = temperature;
		this.countryCode = countryCode;
		this.weatherDescription = weatherDescription;
	}

	_createClass(WeatherApp, [{
		key: "setProperty",
		value: function setProperty(property, value, decorator) {
			property && displayData(this[property], value, decorator);
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

var weatherApp = new WeatherApp(document.getElementsByClassName('city-name')[0], document.getElementsByClassName('temperature')[0], document.getElementsByClassName('country-code')[0], document.getElementsByClassName('weather-description')[0]);

getPosition.then(function (pos) {
	return createUrl(appidKey)(pos.coords.latitude, pos.coords.longitude);
}).then(function (url) {
	return fetch(url);
}).then(function (response) {
	return response.json();
}).then(function (obj) {
	weatherApp.setProperty('cityName', obj.name);
	weatherApp.setProperty('temperature', obj.sys.country);
	weatherApp.setProperty('countryCode', obj.main.temp, function (temp) {
		return Math.floor(temp - 273.15) + ' \xB0C';
	});
	weatherApp.setProperty('weatherDescription', obj.weather[0].description, function (text) {
		return text[0].toUpperCase() + text.slice(1);
	});
});

},{"./WeatherApp":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvZGV2L1dlYXRoZXJBcHAuanMiLCJhcHAvanMvZGV2L21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7SUNBTSxVO0FBQ0wscUJBQVksUUFBWixFQUFzQixXQUF0QixFQUFtQyxXQUFuQyxFQUFnRCxrQkFBaEQsRUFBb0U7QUFBQTs7QUFDbkUsT0FBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsT0FBSyxXQUFMLEdBQW1CLFdBQW5CO0FBQ0EsT0FBSyxXQUFMLEdBQW1CLFdBQW5CO0FBQ0EsT0FBSyxrQkFBTCxHQUEwQixrQkFBMUI7QUFDQTs7Ozs4QkFFVyxRLEVBQVUsSyxFQUFPLFMsRUFBVztBQUN2QyxlQUFZLFlBQVksS0FBSyxRQUFMLENBQVosRUFBNEIsS0FBNUIsRUFBbUMsU0FBbkMsQ0FBWjtBQUNBOzs7Ozs7QUFFRixTQUFTLFdBQVQsQ0FBcUIsRUFBckIsRUFBeUIsSUFBekIsRUFBK0IsU0FBL0IsRUFBMEM7QUFDekMsSUFBRyxTQUFILEdBQWUsWUFBWSxVQUFVLElBQVYsQ0FBWixHQUE4QixJQUE3QztBQUNBOztBQUVELE9BQU8sT0FBUCxHQUFpQixVQUFqQjs7Ozs7QUNoQkEsSUFBTSxhQUFhLFFBQVEsY0FBUixDQUFuQjs7QUFFQSxJQUFNLG1CQUFtQixTQUFuQixnQkFBbUI7QUFBQSxRQUFNLGlCQUFpQixTQUF2QjtBQUFBLENBQXpCOztBQUVBLElBQU0sWUFBWSxTQUFaLFNBQVksQ0FBQyxRQUFEO0FBQUEsUUFBYyxVQUFDLEdBQUQsRUFBTSxHQUFOO0FBQUEsa0VBQ3dCLEdBRHhCLGFBQ21DLEdBRG5DLGVBQ2dELFFBRGhEO0FBQUEsRUFBZDtBQUFBLENBQWxCOztBQUdBLElBQU0sY0FBYyxJQUFJLE9BQUosQ0FDbkIsVUFBQyxPQUFELEVBQVUsTUFBVjtBQUFBLFFBQXFCLHNCQUFzQixVQUFVLFdBQVYsQ0FBc0Isa0JBQXRCLENBQXlDLFVBQUMsUUFBRDtBQUFBLFNBQWMsUUFBUSxRQUFSLENBQWQ7QUFBQSxFQUF6QyxDQUEzQztBQUFBLENBRG1CLENBQXBCOztBQUlBLElBQU0sV0FBVyxrQ0FBakI7O0FBRUEsSUFBSSxhQUFhLElBQUksVUFBSixDQUNoQixTQUFTLHNCQUFULENBQWdDLFdBQWhDLEVBQTZDLENBQTdDLENBRGdCLEVBRWhCLFNBQVMsc0JBQVQsQ0FBZ0MsYUFBaEMsRUFBK0MsQ0FBL0MsQ0FGZ0IsRUFHaEIsU0FBUyxzQkFBVCxDQUFnQyxjQUFoQyxFQUFnRCxDQUFoRCxDQUhnQixFQUloQixTQUFTLHNCQUFULENBQWdDLHFCQUFoQyxFQUF1RCxDQUF2RCxDQUpnQixDQUFqQjs7QUFPQSxZQUNFLElBREYsQ0FDTyxVQUFDLEdBQUQ7QUFBQSxRQUFTLFVBQVUsUUFBVixFQUFvQixJQUFJLE1BQUosQ0FBVyxRQUEvQixFQUF5QyxJQUFJLE1BQUosQ0FBVyxTQUFwRCxDQUFUO0FBQUEsQ0FEUCxFQUVFLElBRkYsQ0FFTyxVQUFDLEdBQUQ7QUFBQSxRQUFTLE1BQU0sR0FBTixDQUFUO0FBQUEsQ0FGUCxFQUdFLElBSEYsQ0FHTyxVQUFDLFFBQUQ7QUFBQSxRQUFjLFNBQVMsSUFBVCxFQUFkO0FBQUEsQ0FIUCxFQUlFLElBSkYsQ0FJTyxVQUFDLEdBQUQsRUFBUztBQUNkLFlBQVcsV0FBWCxDQUF1QixVQUF2QixFQUFtQyxJQUFJLElBQXZDO0FBQ0EsWUFBVyxXQUFYLENBQXVCLGFBQXZCLEVBQXNDLElBQUksR0FBSixDQUFRLE9BQTlDO0FBQ0EsWUFBVyxXQUFYLENBQXVCLGFBQXZCLEVBQXNDLElBQUksSUFBSixDQUFTLElBQS9DLEVBQXFELFVBQUMsSUFBRDtBQUFBLFNBQWEsS0FBSyxLQUFMLENBQVcsT0FBTyxNQUFsQixDQUFiO0FBQUEsRUFBckQ7QUFDQSxZQUFXLFdBQVgsQ0FBdUIsb0JBQXZCLEVBQTZDLElBQUksT0FBSixDQUFZLENBQVosRUFBZSxXQUE1RCxFQUF5RTtBQUFBLFNBQVEsS0FBSyxDQUFMLEVBQVEsV0FBUixLQUF3QixLQUFLLEtBQUwsQ0FBVyxDQUFYLENBQWhDO0FBQUEsRUFBekU7QUFFQSxDQVZGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCJjbGFzcyBXZWF0aGVyQXBwIHtcclxuXHRjb25zdHJ1Y3RvcihjaXR5TmFtZSwgdGVtcGVyYXR1cmUsIGNvdW50cnlDb2RlLCB3ZWF0aGVyRGVzY3JpcHRpb24pIHtcclxuXHRcdHRoaXMuY2l0eU5hbWUgPSBjaXR5TmFtZTtcclxuXHRcdHRoaXMudGVtcGVyYXR1cmUgPSB0ZW1wZXJhdHVyZTtcclxuXHRcdHRoaXMuY291bnRyeUNvZGUgPSBjb3VudHJ5Q29kZTtcclxuXHRcdHRoaXMud2VhdGhlckRlc2NyaXB0aW9uID0gd2VhdGhlckRlc2NyaXB0aW9uO1xyXG5cdH1cclxuXHJcblx0c2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlLCBkZWNvcmF0b3IpIHtcclxuXHRcdHByb3BlcnR5ICYmIGRpc3BsYXlEYXRhKHRoaXNbcHJvcGVydHldLCB2YWx1ZSwgZGVjb3JhdG9yKTtcclxuXHR9XHJcbn1cclxuZnVuY3Rpb24gZGlzcGxheURhdGEoZWwsIGh0bWwsIGRlY29yYXRvcikge1xyXG5cdGVsLmlubmVySFRNTCA9IGRlY29yYXRvciA/IGRlY29yYXRvcihodG1sKSA6IGh0bWw7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gV2VhdGhlckFwcDtcclxuIiwiY29uc3QgV2VhdGhlckFwcCA9IHJlcXVpcmUoJy4vV2VhdGhlckFwcCcpO1xyXG5cclxuY29uc3QgZ2VvbG9jYXRpb25FeGlzdCA9ICgpID0+ICdnZW9sb2NhdGlvbicgaW4gbmF2aWdhdG9yO1xyXG5cclxuY29uc3QgY3JlYXRlVXJsID0gKGFwcGlkS2V5KSA9PiAobGF0LCBsb24pID0+XHJcblx0YGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZBUFBJRD0ke2FwcGlkS2V5fWA7XHJcblxyXG5jb25zdCBnZXRQb3NpdGlvbiA9IG5ldyBQcm9taXNlKFxyXG5cdChyZXNvbHZlLCByZWplY3QpID0+IGdlb2xvY2F0aW9uRXhpc3QoKSAmJiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChwb3NpdGlvbikgPT4gcmVzb2x2ZShwb3NpdGlvbikpXHJcbik7XHJcblxyXG5jb25zdCBhcHBpZEtleSA9ICc3YWQxODM2ZmE2ODI2NzFjMzZkNWEwMjA0MGQxOTRmNCc7XHJcblxyXG5sZXQgd2VhdGhlckFwcCA9IG5ldyBXZWF0aGVyQXBwKFxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NpdHktbmFtZScpWzBdLFxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RlbXBlcmF0dXJlJylbMF0sXHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY291bnRyeS1jb2RlJylbMF0sXHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd2VhdGhlci1kZXNjcmlwdGlvbicpWzBdXHJcbik7XHJcblxyXG5nZXRQb3NpdGlvblxyXG5cdC50aGVuKChwb3MpID0+IGNyZWF0ZVVybChhcHBpZEtleSkocG9zLmNvb3Jkcy5sYXRpdHVkZSwgcG9zLmNvb3Jkcy5sb25naXR1ZGUpKVxyXG5cdC50aGVuKCh1cmwpID0+IGZldGNoKHVybCkpXHJcblx0LnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcblx0LnRoZW4oKG9iaikgPT4ge1xyXG5cdFx0d2VhdGhlckFwcC5zZXRQcm9wZXJ0eSgnY2l0eU5hbWUnLCBvYmoubmFtZSk7XHJcblx0XHR3ZWF0aGVyQXBwLnNldFByb3BlcnR5KCd0ZW1wZXJhdHVyZScsIG9iai5zeXMuY291bnRyeSk7XHJcblx0XHR3ZWF0aGVyQXBwLnNldFByb3BlcnR5KCdjb3VudHJ5Q29kZScsIG9iai5tYWluLnRlbXAsICh0ZW1wKSA9PiBgJHtNYXRoLmZsb29yKHRlbXAgLSAyNzMuMTUpfSDCsENgKTtcclxuXHRcdHdlYXRoZXJBcHAuc2V0UHJvcGVydHkoJ3dlYXRoZXJEZXNjcmlwdGlvbicsIG9iai53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLCB0ZXh0ID0+IHRleHRbMF0udG9VcHBlckNhc2UoKSArIHRleHQuc2xpY2UoMSlcclxuXHRcdCk7XHJcblx0fSk7XHJcbiJdfQ==
