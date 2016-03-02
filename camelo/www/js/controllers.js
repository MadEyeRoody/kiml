angular.module('app.controllers', [])

.controller('kIMLKannIchsMirLeistenCtrl', function($scope, $state) {
//Start Values
  window.localStorage.setItem("fehlbetrag", 400);
  window.localStorage.setItem("Konto1", 1365 );
  window.localStorage.setItem("Konto2", 634 );
  window.localStorage.setItem("Konto3", 2058 );
  window.localStorage.setItem("rate", 25 );
  window.localStorage.setItem("laufzeit", 18 );
  //End Start Values

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

.controller('umbuchungCtrl', function($scope, $ionicPopup, $state) {
  $scope.fehlbetrag=window.localStorage.getItem("fehlbetrag");
  $scope.konto1=window.localStorage.getItem("Konto1");
  $scope.konto2=window.localStorage.getItem("Konto2");
  $scope.konto3=window.localStorage.getItem("Konto3");
  $scope.gesamtbetrag=window.localStorage.getItem("amount");


  $scope.umbuchen = function(kontoChoice){

    console.log(kontoChoice);
    if(kontoChoice==1){
    $scope.konto1 = $scope.konto1-$scope.fehlbetrag;
      window.localStorage.setItem("Konto1",$scope.konto1);
    }
    if(kontoChoice==2){
      $scope.konto2 = $scope.konto2-$scope.fehlbetrag;
      window.localStorage.setItem("Konto2",$scope.konto2);
    }
    if(kontoChoice==3){
      $scope.konto3 = $scope.konto3-$scope.fehlbetrag;
      window.localStorage.setItem("Konto3",$scope.konto3);
    }



    var alertPopup = $ionicPopup.alert({
      title: 'Umbuchung erfolgreich',
      template: 'Vom Konto '+ kontoChoice+' wurden erfolgreich '+$scope.fehlbetrag+' € umgebucht!'
    });

    alertPopup.then(function(res) {
      console.log('Umbuchung durchgeführt');
      $state.go('menu.empfehlung');
    });

    $scope.fehlbetrag=0;
    window.localStorage.setItem("fehlbetrag",$scope.fehlbetrag);


  };


})

.controller('kreditCtrl', function($scope) {
  $scope.fehlbetrag=window.localStorage.getItem("fehlbetrag");
  $scope.rate=window.localStorage.getItem("rate");
  $scope.laufzeit= window.localStorage.getItem("laufzeit");
$scope.gesamtbetrag=window.localStorage.getItem("amount");


})



.controller('kredit2Ctrl', function($scope) {

})
