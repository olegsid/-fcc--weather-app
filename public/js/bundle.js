(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

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

getGeoLocationPosition.then(function (position) {
	return { lat: position.coords.latitude, lon: position.coords.longitude };
}).then(function (pos) {
	return createUrl(appidKey)(pos.lat, pos.lon);
}).then(function (url) {
	return fetch(url);
}).then(function (responce) {
	return responce.json();
}).then(function (obj) {
	return console.log(obj);
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvZGV2L21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBLElBQU0sbUJBQW1CLFNBQW5CLGdCQUFtQjtBQUFBLFFBQU0saUJBQWlCLFNBQXZCO0FBQUEsQ0FBekI7O0FBRUEsSUFBTSxZQUFZLFNBQVosU0FBWSxDQUFDLFFBQUQ7QUFBQSxRQUFjLFVBQUMsR0FBRCxFQUFNLEdBQU47QUFBQSxrRUFDd0IsR0FEeEIsYUFDbUMsR0FEbkMsZUFDZ0QsUUFEaEQ7QUFBQSxFQUFkO0FBQUEsQ0FBbEI7O0FBR0EsSUFBTSx5QkFBeUIsSUFBSSxPQUFKLENBQWEsVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUNoRSxLQUFJLGtCQUFKLEVBQ0MsVUFBVSxXQUFWLENBQXNCLGtCQUF0QixDQUEwQztBQUFBLFNBQVksUUFBUSxRQUFSLENBQVo7QUFBQSxFQUExQztBQUNELENBSDhCLENBQS9COztBQUtBLElBQU0sV0FBVyxrQ0FBakI7O0FBRUEsdUJBQ0UsSUFERixDQUNRLG9CQUFZO0FBQ2xCLFFBQU8sRUFBRSxLQUFLLFNBQVMsTUFBVCxDQUFnQixRQUF2QixFQUFpQyxLQUFLLFNBQVMsTUFBVCxDQUFnQixTQUF0RCxFQUFQO0FBQ0EsQ0FIRixFQUlFLElBSkYsQ0FJUTtBQUFBLFFBQU8sVUFBVSxRQUFWLEVBQW9CLElBQUksR0FBeEIsRUFBNkIsSUFBSSxHQUFqQyxDQUFQO0FBQUEsQ0FKUixFQUtFLElBTEYsQ0FLUTtBQUFBLFFBQU8sTUFBTSxHQUFOLENBQVA7QUFBQSxDQUxSLEVBTUUsSUFORixDQU1RO0FBQUEsUUFBWSxTQUFTLElBQVQsRUFBWjtBQUFBLENBTlIsRUFPRSxJQVBGLENBT1E7QUFBQSxRQUFPLFFBQVEsR0FBUixDQUFZLEdBQVosQ0FBUDtBQUFBLENBUFIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIlxyXG5jb25zdCBnZW9sb2NhdGlvbkV4aXN0ID0gKCkgPT4gJ2dlb2xvY2F0aW9uJyBpbiBuYXZpZ2F0b3JcclxuXHJcbmNvbnN0IGNyZWF0ZVVybCA9IChhcHBpZEtleSkgPT4gKGxhdCwgbG9uKSA9PlxyXG5cdGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mQVBQSUQ9JHthcHBpZEtleX1gO1xyXG5cclxuY29uc3QgZ2V0R2VvTG9jYXRpb25Qb3NpdGlvbiA9IG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0aWYgKGdlb2xvY2F0aW9uRXhpc3QoKSlcclxuXHRcdG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oIHBvc2l0aW9uID0+IHJlc29sdmUocG9zaXRpb24pKTtcclxufSlcclxuXHJcbmNvbnN0IGFwcGlkS2V5ID0gJzdhZDE4MzZmYTY4MjY3MWMzNmQ1YTAyMDQwZDE5NGY0JztcclxuXHJcbmdldEdlb0xvY2F0aW9uUG9zaXRpb25cclxuXHQudGhlbiggcG9zaXRpb24gPT4ge1xyXG5cdFx0cmV0dXJuIHsgbGF0OiBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUsIGxvbjogcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSB9XHJcblx0fSlcclxuXHQudGhlbiggcG9zID0+IGNyZWF0ZVVybChhcHBpZEtleSkocG9zLmxhdCwgcG9zLmxvbikgKVxyXG5cdC50aGVuKCB1cmwgPT4gZmV0Y2godXJsKSApXHJcblx0LnRoZW4oIHJlc3BvbmNlID0+IHJlc3BvbmNlLmpzb24oKSApXHJcblx0LnRoZW4oIG9iaiA9PiBjb25zb2xlLmxvZyhvYmopIClcclxuIl19
