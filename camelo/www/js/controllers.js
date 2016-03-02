angular.module('app.controllers', [])

.controller('kIMLKannIchsMirLeistenCtrl', function($scope, $state) {
$scope.checkAmount = function(betrag){

  betragValue=parseInt(betrag);

  console.log(betragValue);

  if(betragValue > 500){
    $state.go('menu.empfehlung2');

  } else {
    $state.go('menu.empfehlung');
  }
  window.localStorage.setItem("amount", betragValue)
  };
})

.controller('wunschlisteCtrl', function($scope) {

})

.controller('finanzstatusCtrl', function($scope) {

})

.controller('empfehlungCtrl', function($scope) {

  $scope.amount = window.localStorage.getItem("amount");

})

.controller('empfehlung2Ctrl', function($scope) {

  $scope.amount = window.localStorage.getItem("amount");

})

.controller('kontoverwaltungCtrl', function($scope) {

})

.controller('umbuchungCtrl', function($scope) {

})

.controller('kreditCtrl', function($scope) {

})

.controller('kredit2Ctrl', function($scope) {

})
