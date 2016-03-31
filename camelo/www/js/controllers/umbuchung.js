angular
    .module('app.controllers')
    .controller(
        'umbuchungCtrl',
        function($scope, $ionicPopup, $state) {
          $scope.fehlbetrag = parseFloat(window.localStorage
              .getItem("fehlbetrag"));
          $scope.fehlbetragDisplay = parseFloat(window.localStorage.getItem("fehlbetrag")).toFixed(2);
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
          $scope.gesamtbetrag = parseFloat(
              window.localStorage.getItem("amount")).toFixed(2);
          var primeKonto = parseFloat(window.localStorage.getItem("primeKonto"));

          $scope.isKonto1 = true;
          $scope.isKonto2 = true;
          $scope.isKonto3 = true;
          if (primeKonto == 1) {
            $scope.isKonto1 = false;
          }
          if (primeKonto == 2) {
            $scope.isKonto2 = false;
          }
          if (primeKonto == 3) {
            $scope.isKonto3 = false;
          }
          $scope.changeKonto = function(target) {
            $scope.kontoChoice = target;
          }

          $scope.umbuchen = function() {
            var konto = '';
            var kontoChoice = $scope.kontoChoice;
            if (kontoChoice > 0) {
              console.log(kontoChoice);
              if (kontoChoice == 1) {
                $scope.konto1 = (parseFloat($scope.konto1) - parseFloat($scope.fehlbetrag))
                    .toFixed(2);
                window.localStorage.setItem("Konto1", $scope.konto1);

                konto = 'Girokonto';
              }
              if (kontoChoice == 2) {
                $scope.konto2 = (parseFloat($scope.konto2) - parseFloat($scope.fehlbetrag))
                    .toFixed(2);
                window.localStorage.setItem("Konto2", $scope.konto2);
                konto = 'Tagesgeldkonto';
              }
              if (kontoChoice == 3) {
                $scope.konto3 = (parseFloat($scope.konto3) - parseFloat($scope.fehlbetrag))
                    .toFixed(2);
                window.localStorage.setItem("Konto3", $scope.konto3);
                konto = 'Gemeinschaftskonto';
              }

              var alertPopup = $ionicPopup.alert({
                title : 'Umbuchung erfolgreich',
                template : 'Vom ' + konto + ' wurden erfolgreich '
                    + $scope.fehlbetrag.toFixed(2) + ' € umgebucht!'

              });

              alertPopup.then(function(res) {
                window.localStorage.setItem("Konto1", parseFloat(window.localStorage.getItem("Konto1")) + parseFloat($scope.fehlbetrag))
                window.localStorage.setItem("Konto"+kontoChoice, parseFloat(window.localStorage.getItem("Konto"+kontoChoice)) - parseFloat($scope.fehlbetrag))
                console.log('Umbuchung durchgeführt');
                $state.go('menu.empfehlung');
              });

              $scope.fehlbetrag = 0;
              window.localStorage.setItem("fehlbetrag", $scope.fehlbetrag
                  .toFixed(2));
            } else {
              var alertPopup = $ionicPopup.alert({
                title : 'Kein Konto ausgewählt',
                template : 'Bitte wählen Sie ein Konto für die Umbuchung aus!'
              });

              alertPopup.then(function(res) {
                console.log('Umbuchung nicht durchgeführt');

              });
            }
          };
          $scope.demo = function(target) {
            var alertPopup = $ionicPopup.alert({
              title: 'Hinweis',
              template: 'Diese Funktion ist in der Demo nicht verfügbar'
            });
          }
        });
