angular.module('starter.controllers', [])

.controller('CreateTripCtrl', function($scope, $state, $filter, $http) {
	$scope.postData = { location:'Karlsruhe', user:"jens"};
	$scope.request = $scope.postData;
	 $scope.saveTarget = function() {
		 	$http.post('/api/saveTarget',$scope.postData).then(function(resp) {
		 		window.localStorage.setItem("tripId", resp.data.id);
		 	});
			$state.go('tab.showtrip');
	 };
})

.controller('ShowTripCtrl', function($scope, $http) {
	console.log(window.localStorage.getItem("tripId"));
	$scope.postData = { id : window.localStorage.getItem("tripId") };
	$http.post('/api/getAssociates',$scope.postData).then(function(resp) {
		$scope.item = resp.data.doc;
    $scope.numAssociates = resp.data.numAssociates;
	});
})

;
