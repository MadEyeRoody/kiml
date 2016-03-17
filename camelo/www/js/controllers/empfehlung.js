angular
    .module('app.controllers')
    .controller(
        'empfehlungCtrl',
        function($scope, $state, $ionicPopup, $ionicModal) {
          window.localStorage.setItem('refresh', 1)
          $scope.amount = parseFloat(window.localStorage.getItem("amount"));
          $scope.konto1 = parseFloat(window.localStorage.getItem("Konto"
              + window.localStorage.getItem("primeKonto")));
          $scope.prognose = parseFloat((window.localStorage.getItem("prognose")));
          $scope.prognoseTarget = (window.localStorage
              .getItem("prognoseTarget"));
          $scope.erwarteterStand = (Math
              .round(($scope.konto1 - ($scope.amount + $scope.prognose)) * 100) / 100)
              .toFixed(2);
          $scope.amount = $scope.amount.toFixed(2);
          $scope.minAmount = parseFloat((window.localStorage
            .getItem("minRemaining")));
          window.localStorage.setItem("financeType", 'gruen');
          console.log($scope.erwarteterStand);
          $scope.startFinance = function() {
            window.localStorage.setItem("financeType", 'gruen');
            $state.go('menu.finanzstatus');
          };

          $scope.changeTodo = function(target) {
            $scope.wishlist = target;
          }
          $scope.doneGreen = function(choice) {
            choice = $scope.wishlist;
            if (choice) {
              var myPopup = $ionicPopup.show({
                template : '<input type="text">',
                title : 'Zur Wunschliste hinzufügen',
                subTitle : 'Gib einen Namen für diesen Wunsch ein',
                scope : $scope,
                buttons : [
                    {
                      text : 'Abbrechen'
                    },
                    {
                      text : 'Speichern',
                      type : 'button-energized',
                      onTap : function(e) {
                        if (!$scope.wishlist) {
                          // don't allow the user to close unless he enters wifi
                          // password
                          window.localStorage.setItem("wish", $scope.wishlist
                              + ' - ' + window.localStorage.getItem("amount")
                              + ' €');
                          $state.go('menu.kIMLKannIchsMirLeisten');
                        } else {
                          e.preventDefault();

                        }
                      }
                    } ]
              });
            } else {
              $state.go('menu.kIMLKannIchsMirLeisten');
            }
          };

          $scope.notify = function() {
            $scope.openModal();

          };


          $ionicModal.fromTemplateUrl('modalEmpfehlung.html', {
            scope : $scope,

            animation : 'slide-in-up',

          }).then(function(modal) {
            $scope.modal = modal;
            $scope.$broadcast('doRefresh');
            console.log(modal);
          });
          $scope.openModal = function() {
            $scope.modal.show();
            $scope.$broadcast('doRefresh');
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
