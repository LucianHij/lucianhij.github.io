// var app = angular.module("app")
// .factory('imageServiceInstagram', ['$http', function($http){
	
// 	var apiUrl = 'https://api.instagram.com/v1/';
//     var clientId ='cf705fe7e4864b5fa474a461b0c1188b';
// 	//   var clientId ='642176ece1e7445e99244cec26f4de1f';
// 	var getLocations = function(lat, lng) {
// 		return $http.jsonp(apiUrl + "locations/search?lat=" + lat + "&lng=" + lng + "&distance=5000&client_id=" + clientId + "&callback=JSON_CALLBACK")
// 		.then(function(response){
// 			console.log(response.data);
// 			return response.data;
// 		});
// 	};

// 	var getPhotos = function(locId) {
// 		return $http.jsonp(apiUrl + "locations/" + locId + "/media/recent" + "?client_id=" + clientId + "&callback=JSON_CALLBACK")
// 		.then(function(response){
// 			console.log(response.data);
// 			return response.data;
// 		});
// 	};

// 	return {
// 		getLocations: getLocations,
// 		getPhotos: getPhotos
// 	};
// }]);



var app = angular.module("app")
.factory('imageServiceInstagram', ['$http', function($http){
	
	var apiUrl = "https://api.flickr.com/services/rest/?";
	var apiKey ='eb49def2b96ee01ede0d755735ef25fd';

	var getLocations = function(lat, lng) {
		// console.log($http.jsonp("http://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=eb49def2b96ee01ede0d755735ef25fd&per_page=30&format=json" + "&callback=JSON_CALLBACK"));

		return $http.jsonp(apiUrl + "method=flickr.photos.search&api_key=" + apiKey + "&lat=" + lat + "&lon=" + lng + "&radius=5&format=json" + "&jsoncallback=JSON_CALLBACK")
		.then(function(response){

			//console.log(response.data);
			
			return response.data.photos.photo;
		});
	};

	var getPhotos = function(locId) {
		// console.log($http.jsonp("http://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=eb49def2b96ee01ede0d755735ef25fd&per_page=30&format=json" + "&callback=JSON_CALLBACK"));

		return $http.jsonp(apiUrl + "method=flickr.photos.getInfo&api_key=" + apiKey + "&photo_id="+ locId + "&format=json" + "&jsoncallback=JSON_CALLBACK")
		.then(function(response){

			//console.log(response.data);
			return response.data.photo;
		});
	};

	var getInfo = function(locId)
	{
		return $http.jsonp(apiUrl + "method=flickr.photos.getInfo&api_key=" + apiKey + "&photo_id="+ locId + "&format=json" + "&jsoncallback=JSON_CALLBACK")
		.then(function(response){

			console.log(response.data);
			return response.data.photo;
		});
	};
	return {
		getLocations: getLocations,
		getPhotos: getPhotos,
		getInfo: getInfo
	};
}]);