angular.module('app.controllers')
    .controller(
        'homeCtrl',
        function($scope, $state) {
          // Start Values
          $scope.formdata = [];
          $scope.formdata.betragValue = NaN;
          window.localStorage.setItem("Konto1", 652.00);
          window.localStorage.setItem("Konto1Bez", 'Girokonto');
          window.localStorage.setItem("Konto1IBAN",
              'DE 11 7019 0000 0000 0089 74');
          window.localStorage.setItem("Konto2", 411.00);
          window.localStorage.setItem("Konto2Bez", 'Tagesgeldkonto');
          window.localStorage.setItem("Konto2IBAN",
              'DE 40 7919 0000 0001 5311 58');
          window.localStorage.setItem("Konto3", 634.00);
          window.localStorage.setItem("Konto3Bez", 'Gemeinschaftskonto');
          window.localStorage.setItem("Konto3IBAN",
              'DE 46 1009 0900 0887 5754 33');
          window.localStorage.setItem("primeKonto", 1);
          window.localStorage.setItem("laufzeit", 18);
          window.localStorage.setItem("amount", 0);
          window.localStorage.setItem("financeType", 'ohne');
          window.localStorage.setItem("prognoseTarget", 'zum Ende des Monats')
          window.localStorage.setItem("prognose", 202.00);
          window.localStorage.setItem("prognoseReason", 'Versicherungen');
          window.localStorage.setItem("minRemaining", 200.00);
          window.localStorage.setItem("height", 550);

          var wunschliste = [ {
            name : "Fahrrad",
            betrag : 500.00
          }, {
            name : "Fernseher",
            betrag : 1200.00
          }, {
            name : "Tablet",
            betrag : 499.00
          } ];

          // Start Values for wishlist
          window.localStorage.setItem("wunschliste", JSON
              .stringify(wunschliste));

          // End Start Values
          $state.go('menu.kIMLKannIchsMirLeisten')
        });