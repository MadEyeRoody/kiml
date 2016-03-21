angular.module('app.controllers').controller(
    'wunschlisteCtrl',
    function($scope, $state, wishlist) {
      $scope.wunschliste = wishlist.list;
      
      $scope.onAdd = function() {
        $state.go('menu.addWunsch');
      }
    });