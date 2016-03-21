angular.module('app.controllers').controller(
    'kontoverwaltungCtrl',
    function($scope, $state, $ionicPopup) {
      $scope.kontoChoice = parseInt(window.localStorage.getItem("primeKonto"));
      $scope.konto1 = parseFloat(window.localStorage.getItem("Konto1"))
          .toFixed(2);
      $scope.konto1Bez = window.localStorage.getItem("Konto1Bez");
      $scope.konto1IBAN = window.localStorage.getItem("Konto1IBAN");
      $scope.konto2 = parseFloat(window.localStorage.getItem("Konto2"))
          .toFixed(2);
      $scope.konto2Bez = window.localStorage.getItem("Konto2Bez");
      $scope.konto2IBAN = window.localStorage.getItem("Konto2IBAN");
      $scope.konto3 = parseFloat(window.localStorage.getItem("Konto3"))
          .toFixed(2);
      $scope.konto3Bez = window.localStorage.getItem("Konto3Bez");
      $scope.konto3IBAN = window.localStorage.getItem("Konto3IBAN");
      $scope.minRemaining = parseFloat(
          window.localStorage.getItem("minRemaining")).toFixed(2);

      $scope.prognoseTarget = window.localStorage.getItem("prognoseTarget");
      $scope.save = function(choice, untergrenze, target) {
        window.localStorage.setItem("primeKonto", choice);
        window.localStorage.setItem("minRemaining", untergrenze);
        window.localStorage.setItem("prognoseTarget", target)
        window.localStorage.setItem('refresh', 1);
        $state.go("menu.kIMLKannIchsMirLeisten");
      };

      $scope.changePrognoseTarget = function(target) {
        $scope.prognoseTarget = target;
      }
      $scope.demo = function(target) {
        var alertPopup = $ionicPopup.alert({
          title : 'Hinweis',
          template : 'Diese Funktion ist in der Demo nicht verfügbar'
        });

        alertPopup.then(function(res) {
          console.log('no Input');
        });
      }
    });
