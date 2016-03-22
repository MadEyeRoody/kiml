angular.module('app.controllers').controller('wunschlisteCtrl',
    function($scope, $state, wishlist, empfehlung) {
      $scope.wunschliste = wishlist.list;

      $scope.edit = false;

      $scope.swapEdit = function() {
        $scope.edit = !$scope.edit;
      };
      
      $scope.moveItem = function(item, fromIndex, toIndex) {
        //Move the item in the array
        $scope.wunschliste.splice(fromIndex, 1);
        $scope.wunschliste.splice(toIndex, 0, item);
      };
      
      $scope.onAdd = function() {
        $state.go('menu.addWunsch');
      };

      $scope.onItemClicked = function(item) {
		empfehlung.showEmpfehlung(item.name,item.betrag);
      };
    });