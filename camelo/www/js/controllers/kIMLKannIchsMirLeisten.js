angular
    .module('app.controllers')
    .controller(
        'kIMLKannIchsMirLeistenCtrl',
        function($scope, $state, $cordovaBarcodeScanner, $ionicPlatform,
            $ionicPopup, $ionicModal, empfehlung) {

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
		  $scope.artikel='';

          $scope.checkAmount = function(betrag) {
			empfehlung.showEmpfehlung($scope.artikel,betrag);
          }

          $scope.scanBarCode = function() {
            $ionicPlatform.ready(function() {
              $cordovaBarcodeScanner.scan().then(function(result) {
                if (result.cancelled) {
                  console.log("Scan cancelled");
                } else {
                  getPreisToBarcode(result.format, result.text);
                  $scope.openModal(result.format, result.text);
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

          $ionicModal.fromTemplateUrl('modalScan.html', {
            scope : $scope,

            animation : 'slide-in-up',

          }).then(function(modal) {
            $scope.modal = modal;
            console.log(modal);
          });
          $scope.openModal = function(format, data) {
            $scope.format = format;
            $scope.data = data;
            $scope.modal.show();
          };
          $scope.closeModal = function() {

            $scope.modal.hide();
          };
          // Cleanup the modal when we're done with it!
          $scope.$on('$destroy', function() {

            $scope.modal.remove();
          });
          // Execute action on hide modal
          $scope.$on('modal.hidden', function() {
            // Execute action
          });
          // Execute action on remove modal
          $scope.$on('modal.removed', function() {
            // Execute action
          });

        });
