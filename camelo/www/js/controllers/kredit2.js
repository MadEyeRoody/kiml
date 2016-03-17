angular.module('app.controllers').controller(
    'kredit2Ctrl',
    function($scope, $state, $ionicPopup) {
      $scope.fehlbetrag = parseFloat(window.localStorage.getItem("fehlbetrag"))
          .toFixed(2);
      $scope.rate = window.localStorage.getItem("rate");
      $scope.laufzeit = window.localStorage.getItem("laufzeit");

      $scope.order = function() {
        var alertPopup = $ionicPopup.alert({
          title : 'Kreditantrag erfolgreich',
          template : 'Ihr Kreditbetrag von ' + $scope.fehlbetrag
              + ' € wurde Ihrem Konto gutgeschrieben!'
        });

        alertPopup.then(function(res) {
          window.localStorage.setItem("Konto1", parseFloat(
              window.localStorage.getItem("Konto1")).toFixed(2)
              + $scope.fehlbetrag)
          console.log('Kreditantrag durchgefÃ¼hrt');
          $state.go('menu.kIMLKannIchsMirLeisten');
        });
      }
    });