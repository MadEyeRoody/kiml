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
		  $scope.artikelTitle='';
          $scope.artikelExtra='';

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
              $scope.artikelTitle="Apple MacBook Pro mit Retina Display";
              $scope.artikelExtra = "Core i7 2,2 GHz - 15,4"
              $scope.betrag =1999.00;
              $scope.wishPic="Macbook";
              $scope.openModal();

            }
            else if ("UPC_A" === format && "888462062657" === data) {
              $scope.artikelTitle="Apple IPhone 6 Silver";
              $scope.artikelExtra = "16 GB"
              $scope.betrag =719.00;
              $scope.wishPic="IPhone";
              $scope.openModal();

            }else if ("UPC_A" === format && "888462532556" === data) {
              $scope.artikelTitle="Apple IPad Pro Silver";
              $scope.artikelExtra = "Wifi - 128GB"
              $scope.betrag =499.99;
              $scope.wishPic="IPad";
              $scope.openModal();

            }else if ("UPC_A" === format && "811571016549" === data) {
              $scope.artikelTitle="Google Chromecast 2";
              $scope.artikelExtra = ""
              $scope.betrag =37.00;
              $scope.wishPic="Chromecast";
              $scope.openModal();

            }else if ("UPC_A" === format && "" === data) {
              $scope.artikelTitle="Snickers Riegel";
              $scope.artikelExtra = ""
              $scope.betrag =0.57;
              $scope.wishPic="Snickers";
              $scope.openModal();

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
          $scope.openModal = function() {
            $scope.modal.show();
          };
          $scope.closeModal = function() {
            $scope.formdata.betragValue = $scope.betrag;
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
