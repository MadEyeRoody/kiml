angular
    .module('app.controllers')
    .controller(
        'kreditCtrl',
        function($scope, $state) {
          $scope.fehlbetrag = parseFloat(
              window.localStorage.getItem("fehlbetrag")).toFixed(2);
          $scope.laufzeit = parseFloat(window.localStorage.getItem("laufzeit"));
          $scope.gesamtbetrag = parseFloat(
              window.localStorage.getItem("amount")).toFixed(2);
          $scope.kreditBack = "menu.empfehlung"
              + window.localStorage.getItem("kreditBack");


          $scope.rate = Math
              .round(100.0 * (parseFloat($scope.fehlbetrag) / $scope.laufzeit)) / 100.0;
          ;

          if($scope.rate > 250){
            $scope.iconKredit = "rot";
          } else {
            $scope.iconKredit = "gruen";
          }

          $scope.saveLaufzeit = function(laufzeit) {
            console.log(laufzeit);
            window.localStorage.setItem("laufzeit", laufzeit);
            $scope.rate = Math
                .round(100.0 * (parseFloat($scope.fehlbetrag) / laufzeit)) / 100.0;
            ;
            if($scope.rate > 250){
              $scope.iconKredit = "rot";
            } else {
              $scope.iconKredit = "gruen";
            }

            console.log($scope.rate);
            $scope.$apply();
            window.localStorage.setItem("rate", $scope.rate.toFixed(2));

          }

        });
