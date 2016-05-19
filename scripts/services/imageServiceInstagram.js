var app = angular.module("app")
.factory('imageServiceInstagram', ['$http', function($http){
	
	var apiUrl = 'https://api.instagram.com/v1/';
	// var clientId ='a2de8fe2798242cea25c3879c3be776c';
	   var clientId ='642176ece1e7445e99244cec26f4de1f';
	var getLocations = function(lat, lng) {
		return $http.jsonp(apiUrl + "locations/search?lat=" + lat + "&lng=" + lng + "&distance=5000&client_id=" + clientId + "&callback=JSON_CALLBACK")
		.then(function(response){
			return response.data;
		});
	};

	var getPhotos = function(locId) {
		return $http.jsonp(apiUrl + "locations/" + locId + "/media/recent" + "?client_id=" + clientId + "&callback=JSON_CALLBACK")
		.then(function(response){
			return response.data;
		});
	};

	return {
		getLocations: getLocations,
		getPhotos: getPhotos
	};
}]);