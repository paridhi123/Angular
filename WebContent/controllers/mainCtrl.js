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
