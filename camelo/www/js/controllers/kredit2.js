angular.module('app.controllers').controller(
    'kredit2Ctrl',
    function($scope, $state, $ionicPopup) {
      $scope.fehlbetrag = parseFloat(window.localStorage.getItem("fehlbetrag"))
          .toFixed(2);
      $scope.rate = window.localStorage.getItem("rate");
      $scope.laufzeit = window.localStorage.getItem("laufzeit");
      $scope.gesamtbetrag = parseFloat(
        window.localStorage.getItem("amount")).toFixed(2);

      $scope.order = function() {
        var alertPopup = $ionicPopup.alert({
          title : 'Kreditantrag erfolgreich',
          template : 'Ihr Kreditbetrag von ' + $scope.fehlbetrag
              + ' € wurde Ihrem Konto gutgeschrieben!'
        });

        alertPopup.then(function(res) {
          window.localStorage.setItem("Konto1", parseFloat(window.localStorage.getItem("Konto1")) + parseFloat($scope.fehlbetrag))
          console.log('Kreditantrag durchgeführt');
          $state.go('menu.empfehlung');
        });
      }
      $scope.demo = function(target) {
        var alertPopup = $ionicPopup.alert({
          title: 'Hinweis',
          template: 'Diese Funktion ist in der Demo nicht verfügbar'
        });
      }
    });
