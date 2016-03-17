angular.module('app.controllers').controller(
    'finanzstatusCtrl',
    function($scope) {
      // $scope.financeType = window.localStorage.getItem("financeType");
      $scope.$broadcast('doRefresh');

      var gesamtsaldo = parseFloat(window.localStorage.getItem("Konto1"))
          + parseFloat(window.localStorage.getItem("Konto2"))
          + parseFloat(window.localStorage.getItem("Konto3"));

      window.localStorage.setItem("gesamtsaldo", gesamtsaldo);

      $scope.resetFinanceType = function() {
        window.localStorage.setItem("financeType", "ohne");
        window.localStorage.setItem("amount", 0);
        $scope.$broadcast('doRefresh');

      }
    });