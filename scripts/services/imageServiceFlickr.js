var app = angular.module("app")
.factory('imageServiceFlickr', ['$http', function($http){
	
	var apiUrl = "http://api.flickr.com/services/rest/?";
	var apiKey ='eb49def2b96ee01ede0d755735ef25fd';

	var getLocations = function(lat, lng) {
		// console.log($http.jsonp("http://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=eb49def2b96ee01ede0d755735ef25fd&per_page=30&format=json" + "&callback=JSON_CALLBACK"));

		return $http.jsonp(apiUrl + "method=flickr.photos.search&api_key=" + apiKey + "&lat=" + lat + "&lon=" + lng + "&radius=5&format=json" + "&jsoncallback=JSON_CALLBACK")
		.then(function(response){
			console.log(response);
			
			return response.photos;
		});
	};

	var getPhotos = function(locId) {
		// console.log($http.jsonp("http://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=eb49def2b96ee01ede0d755735ef25fd&per_page=30&format=json" + "&callback=JSON_CALLBACK"));

		return $http.jsonp(apiUrl + "method=flickr.photos.geo.getLocation&api_key=" + apiKey + "&photo_id="+ locId + "&format=json" + "&jsoncallback=JSON_CALLBACK")
		.then(function(response){
			console.log(locId);
			return response.photo;
		});
	};

	return {
		getLocations: getLocations,
		getPhotos: getPhotos
	};
}]);