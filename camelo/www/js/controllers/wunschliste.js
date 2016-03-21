angular.module('app.controllers').controller('wunschlisteCtrl',
    function($scope, $state, wishlist) {
      $scope.wunschliste = wishlist.list;

      $scope.edit = false;

      $scope.swapEdit = function() {
        $scope.edit = !$scope.edit;
      }

      $scope.onAdd = function() {
        $state.go('menu.addWunsch');
      }
    });