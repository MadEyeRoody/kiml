angular.module('app.controllers').controller('addWunschCtrl',
    function($scope, $state, wishlist) {
      $scope.wunschliste = wishlist.list;

      $scope.addWunsch = function(newWish) {
        wishlist.add(newWish.name, newWish.betrag);
        $state.go('menu.wunschliste');
      }
    });