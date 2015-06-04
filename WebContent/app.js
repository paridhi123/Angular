var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.controller('mainController', ['$scope', '$location', 'forecastService',  function($scope, $location, forecastService){
	$scope.city=forecastService.city;
	$scope.$watch('city', function(newValue, oldValue) {
	  console.log('newValue ' + newValue);
	  console.log('oldValue ' + oldValue);
	  forecastService.city = $scope.city;
	});
	
	/* to make the submission work on pressing enter */
	$scope.submit = function(path){
		$location.path = (path);
		console.log('submit clicked ' + $location.path);
	};
}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams', 'forecastService', '$resource', function($scope, $routeParams, forecastService, $resource){
	$scope.city=forecastService.city;
	$scope.days = $routeParams.days || '2';
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
						{callback: "JSON_CALLBACK"},
						{get: {method: "JSONP"}}
						);
	$scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});
	console.log($scope.weatherResult);
	
	$scope.convertToF = function(degK){
		return Math.round((1.8*(degK-273)) + 32);
	};
	$scope.convertToDate = function(date){
		return new Date(date * 1000);
	};

}]);

weatherApp.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: "home.htm",
			controller: "mainController"
		})
		.when('/city',{
			templateUrl: "forecast.html",
			controller: "forecastController"
		})
		.when('/city/:days',{
			templateUrl: "forecast.html",
			controller: "forecastController"
		}).
		otherwise({
			redirectTo: '/'
		});
});

weatherApp.service('forecastService', function(){
	this.city = "";
});

weatherApp.directive('forecastDirective', function(){
	return{
		restrict:"E",
		templateUrl:"forecast-directive.html",
		replace: true,
		scope:{
			weatherDay: "=",
			weatherDate:"@",
			convertToF: "&",
			convertToDate: "&"
			
		}
	};
});
