angular
    .module('app.controllers')
    .controller(
        'empfehlung3Ctrl',
        function($scope, $state, $ionicPopup) {
          $scope.todoChoice = "zur Wunschliste hinzufügen";
          window.localStorage.setItem('refresh', 1)
          $scope.amount = parseFloat((window.localStorage.getItem("amount")));
          $scope.konto1 = parseFloat(window.localStorage.getItem("Konto"
              + window.localStorage.getItem("primeKonto")));
          $scope.prognose = parseFloat((window.localStorage.getItem("prognose")));
          $scope.prognoseTarget = (window.localStorage
              .getItem("prognoseTarget"));
          $scope.minAmount = parseFloat((window.localStorage
              .getItem("minRemaining")));
          $scope.erwarteterStand = (Math
              .round(($scope.konto1 - ($scope.amount + $scope.prognose)) * 100) / 100)
              .toFixed(2);
          $scope.fehlbetrag = (-($scope.erwarteterStand - $scope.minAmount))
              .toFixed(2);
          window.localStorage.setItem("fehlbetrag", $scope.fehlbetrag);
          window.localStorage.setItem("financeType", 'rot');
          $scope.amount = $scope.amount.toFixed(2);

          $scope.startFinance = function() {
            window.localStorage.setItem("financeType", 'rot');
            $state.go('menu.finanzstatus');
          };

          $scope.notify = function() {
            var alertPopup = $ionicPopup
                .alert({
                  title : 'Hinweis',
                  template : 'Heute kannst du es dir noch nicht leisten. Dir fehlen noch '
                      + $scope.fehlbetrag
                      + ' €! Es sind keine Umbuchungsmöglichkeiten vorhanden'
                });

            alertPopup.then(function(res) {
              console.log('Information Shown');
            });
          }
          $scope.changeTodo = function(target) {
            $scope.todoChoice = target;
          }

          $scope.doneRed = function() {

            target = $scope.todoChoice;

            if (target) {
              console.log(target);
              if (target == "zur Wunschliste hinzufügen") {
                var myPopup = $ionicPopup.show({
                  template : '<input type="text" ng-model="wishlist">',
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
                            // don't allow the user to close unless he enters
                            // wifi password
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
              } else if (target == "Kredit beantragen") {
                window.localStorage.setItem("kreditBack", 3);
                $state.go('menu.kredit')

              } else {

                var alertPopup = $ionicPopup.alert({
                  title : 'Not Implemented yet',
                  template : 'Diese Funktion ist in der Demo nicht verfügbar'
                });

                alertPopup.then(function(res) {

                  console.log('no Input');

                });
              }
            }
          };
        });