
const geolocationExist = () => 'geolocation' in navigator

const createUrl = (appidKey) => (lat, lon) =>
	`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${appidKey}`;

const getGeoLocationPosition = new Promise( (resolve, reject) => {
	if (geolocationExist())
		navigator.geolocation.getCurrentPosition( position => resolve(position));
})

const appidKey = '7ad1836fa682671c36d5a02040d194f4';

getGeoLocationPosition
	.then( position => {
		return { lat: position.coords.latitude, lon: position.coords.longitude }
	})
	.then( pos => createUrl(appidKey)(pos.lat, pos.lon) )
	.then( url => fetch(url) )
	.then( responce => responce.json() )
	.then( obj => console.log(obj) )
