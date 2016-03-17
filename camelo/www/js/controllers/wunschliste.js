angular.module('app.controllers').controller(
    'wunschlisteCtrl',
    function($scope) {
      $scope.wunschliste = JSON.parse(window.localStorage
          .getItem("wunschliste"));
    });