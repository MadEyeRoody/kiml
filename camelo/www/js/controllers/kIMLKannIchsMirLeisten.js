angular
    .module('app.controllers')
    .controller(
        'kIMLKannIchsMirLeistenCtrl',
        function($scope, $state, $cordovaBarcodeScanner, $ionicPlatform,
            $ionicPopup, $ionicModal) {

          if (window.localStorage.getItem("prognoseTarget") == 'zum Ende des Monats') {
            window.localStorage.setItem("prognose", 202.00);
          } else {
            window.localStorage.setItem("prognose", 202.00);
          }

          var isWebView = ionic.Platform.isWebView();

          if (isWebView) {
            $scope.barcodeScannerVisibility = true;
          } else {
            $scope.barcodeScannerVisibility = false;
          }

          $scope.formdata = [];

          $scope.checkAmount = function(betrag) {

            var betragValue = parseFloat(betrag);
            var prognose = parseFloat(window.localStorage.getItem("prognose"));
            var minRemaining = parseFloat(window.localStorage
                .getItem("minRemaining"));
            var konto1Value = parseFloat(window.localStorage.getItem("Konto1"));
            var konto2Value = parseFloat(window.localStorage.getItem("Konto2"));
            var konto3Value = parseFloat(window.localStorage.getItem("Konto3"));
            var kontoGesamtValue = konto1Value + konto2Value + konto3Value;
            var kontoPrimeValue = parseFloat(window.localStorage
                .getItem("Konto" + window.localStorage.getItem("primeKonto")));

            console.log(betragValue);
            if (betragValue > 0) {
              if ((kontoPrimeValue - (betragValue + prognose)) >= minRemaining) {
                $state.go('menu.empfehlung');

              } else if ((kontoGesamtValue - (betragValue + prognose)) >= minRemaining) {
                $state.go('menu.empfehlung2');
              } else if ((kontoGesamtValue - (betragValue + prognose)) < minRemaining) {
                $state.go('menu.empfehlung3');
              }
              window.localStorage.setItem("amount", betragValue)
            } else {

              var alertPopup = $ionicPopup.alert({
                title : 'Kein Betrag eingegeben',
                template : 'Bitte gib einen Betrag ein!'
              });

              alertPopup.then(function(res) {
                // window.localStorage.setItem("Konto1",window.localStorage.getItem("Konto1")+$scope.fehlbetrag)
                console.log('no Input');

              });
            }
            ;
          }

          $scope.scanBarCode = function() {
            $ionicPlatform.ready(function() {
              $cordovaBarcodeScanner.scan().then(function(result) {
                if (result.cancelled) {
                  console.log("Scan cancelled");
                } else {
                  getPreisToBarcode(result.format, result.text);
                }
              }, function(error) {
                // An error occurred
                var scanResults = 'Error: ' + error;
                console.log(scanResults);
              });
            });
          };

          $scope.betragChanged = function() {
            $scope.artikelAnzeigeVisibility = false;
          };

          function getPreisToBarcode(format, data) {
            // mock impl.
            if ("UPC_A" === format && "888462108799" === data) {
              $scope.formdata.betragValue = 1599.99;
              $scope.artikelAnzeigeVisibility=true;
              $scope.artikel="Apple MacBook Pro mit Retina Display - Core i7 2,2 GHz - 15,4";
            } else {
              var alertPopup = $ionicPopup.alert({
                title : "Kein Preis gefunden",
                // template: "Zu dem gescannten Artikel konnte kein Preis
                // ermittelt werden. Bitte gib einen Betrag ein!"
                template : format + data
              });
            }
          }
        });