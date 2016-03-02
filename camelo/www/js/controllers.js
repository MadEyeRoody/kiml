angular.module('app.controllers', ['ionic','ngCordova'])

.controller('kIMLKannIchsMirLeistenCtrl', function($scope, $state) {
//Start Values
  window.localStorage.setItem("fehlbetrag", 119);
  window.localStorage.setItem("Konto1", 650 );
  window.localStorage.setItem("Konto2", 500 );
  window.localStorage.setItem("Konto3", 3000 );
  window.localStorage.setItem("rate", 25 );
  window.localStorage.setItem("laufzeit", 18 );
  window.localStorage.setItem("amount",0);
  window.localStorage.setItem("kreditRate", 0);
  window.localStorage.setItem("kreditLaufzeit", 0);
  window.localStorage.setItem("financeType",'green');
  //End Start Values

  $scope.checkAmount = function(betrag){

  betragValue=parseInt(betrag);

  console.log(betragValue);

  if(betragValue>3980){
    $state.go('menu.empfehlung3');

  }else if(betrag>280 && betrag<3980) {
    $state.go('menu.empfehlung2');
  }else {
      $state.go('menu.empfehlung');
    }
  window.localStorage.setItem("amount", betragValue)
  };
})

.controller('wunschlisteCtrl', function($scope,$cordovaBarcodeScanner,$ionicPlatform) {
  var vm = this;

  vm.scan = function(){
    $ionicPlatform.ready(function() {
      $cordovaBarcodeScanner
        .scan()
        .then(function(result) {
          // Success! Barcode data is here
          vm.scanResults = "We got a barcoden" +
            "Result: " + result.text + "n" +
            "Format: " + result.format + "n" +
            "Cancelled: " + result.cancelled;
        }, function(error) {
          // An error occurred
          vm.scanResults = 'Error: ' + error;
        });
    });
  };

  vm.scanResults = '';
})

.controller('finanzstatusCtrl', function($scope) {

})

.controller('empfehlungCtrl', function($scope, $state,$ionicPopup) {

  $scope.amount = window.localStorage.getItem("amount");
  $scope.konto1 = window.localStorage.getItem("Konto1");

  $scope.startFinance = function(){
    window.localStorage.setItem("financeType",'green');
    $state.go('menu.finanzstatus');
  };

  $scope.doneGreen = function(choice){

   if(choice){
     var myPopup = $ionicPopup.show({
       template: '<input type="text" ng-model="wishlist">',
       title: 'Zur Wunschliste hinzufügen',
       subTitle: 'Gib einen Namen für diesen Wunsch ein',
       scope: $scope,
       buttons: [
         { text: 'Cancel' },
         {
           text: '<b>Save</b>',
           type: 'button-energized',
           onTap: function(e) {
             if (!$scope.wishlist) {
               //don't allow the user to close unless he enters wifi password
               window.localStorage.setItem("wish",$scope.wishlist+' - '+window.localStorage.getItem("amount")+' €');
               $state.go('menu.kIMLKannIchsMirLeisten');
             } else {
               e.preventDefault();

             }
           }
         }
       ]
     });
   }else{
     $state.go('menu.kIMLKannIchsMirLeisten');
   }

  };

})

.controller('empfehlung2Ctrl', function($scope, $state,$ionicPopup) {
  $scope.todoChoice = 1;
  $scope.amount = window.localStorage.getItem("amount");
  $scope.konto1 = window.localStorage.getItem("Konto1");

  $scope.startFinance = function(){
    window.localStorage.setItem("financeType",'yellow');
    $state.go('menu.finanzstatus');
  };

  $scope.doneYellow = function(choice,target){


    if(choice){
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="wishlist">',
        title: 'Zur Wunschliste hinzufügen',
        subTitle: 'Gib einen Namen für diesen Wunsch ein',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-energized',
            onTap: function(e) {
              if (!$scope.wishlist) {
                //don't allow the user to close unless he enters wifi password
                window.localStorage.setItem("wish",$scope.wishlist+' - '+window.localStorage.getItem("amount")+' €');

                if(target>0) {
                  console.log(target);
                  if (target == 1) {
                    $state.go('menu.umbuchung');
                  }
                  if (target == 2) {
                    $state.go('menu.kredit')
                  }


                }


              } else {
                e.preventDefault();

              }
            }
          }
        ]
      });
    }else{
      if(target>0) {
        console.log(target);
        if (target == 1) {
          $state.go('menu.umbuchung');
        }
        if (target == 2) {
          $state.go('menu.kredit')
        }

        }

    }

  };

})

  .controller('empfehlung3Ctrl', function($scope, $state,$ionicPopup) {
    $scope.todoChoice = 2;
    $scope.amount = window.localStorage.getItem("amount");
    $scope.konto1 = window.localStorage.getItem("Konto1");

    $scope.startFinance = function(){
      window.localStorage.setItem("financeType",'red');
      $state.go('menu.finanzstatus');
    };

    $scope.doneYellow = function(choice,target){


      if(choice){
        var myPopup = $ionicPopup.show({
          template: '<input type="text" ng-model="wishlist">',
          title: 'Zur Wunschliste hinzufügen',
          subTitle: 'Gib einen Namen für diesen Wunsch ein',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-energized',
              onTap: function(e) {
                if (!$scope.wishlist) {
                  //don't allow the user to close unless he enters wifi password
                  window.localStorage.setItem("wish",$scope.wishlist+' - '+window.localStorage.getItem("amount")+' €');

                  if(target>0) {
                    console.log(target);
                    if (target == 1) {
                      $state.go('menu.umbuchung');
                    }
                    if (target == 2) {
                      $state.go('menu.kredit')
                    }

                  }


                } else {
                  e.preventDefault();

                }
              }
            }
          ]
        });
      }else{
        if(target>0) {
          console.log(target);
          if (target == 1) {
            $state.go('menu.umbuchung');
          }
          if (target == 2) {
            $state.go('menu.kredit')
          }

        }

      }

    };

  })

.controller('kontoverwaltungCtrl', function($scope) {

})

.controller('umbuchungCtrl', function($scope, $ionicPopup, $state) {
  $scope.fehlbetrag=window.localStorage.getItem("fehlbetrag");
  $scope.konto1=window.localStorage.getItem("Konto1");
  $scope.konto2=window.localStorage.getItem("Konto2");
  $scope.konto3=window.localStorage.getItem("Konto3");
  $scope.gesamtbetrag=window.localStorage.getItem("amount");


  $scope.umbuchen = function(kontoChoice){

    if(kontoChoice>0) {
      console.log(kontoChoice);
      if (kontoChoice == 1) {
        $scope.konto1 = $scope.konto1 - $scope.fehlbetrag;
        window.localStorage.setItem("Konto1", $scope.konto1);
      }
      if (kontoChoice == 2) {
        $scope.konto2 = $scope.konto2 - $scope.fehlbetrag;
        window.localStorage.setItem("Konto2", $scope.konto2);
      }
      if (kontoChoice == 3) {
        $scope.konto3 = $scope.konto3 - $scope.fehlbetrag;
        window.localStorage.setItem("Konto3", $scope.konto3);
      }


      var alertPopup = $ionicPopup.alert({
        title: 'Umbuchung erfolgreich',
        template: 'Vom Konto ' + kontoChoice + ' wurden erfolgreich ' + $scope.fehlbetrag + ' € umgebucht!'
      });

      alertPopup.then(function (res) {
        console.log('Umbuchung durchgeführt');
        $state.go('menu.empfehlung');
      });

      $scope.fehlbetrag = 0;
      window.localStorage.setItem("fehlbetrag", $scope.fehlbetrag);
    }else {
      var alertPopup = $ionicPopup.alert({
        title: 'Kein Konto ausgewählt',
        template: 'Bitte wählen Sie ein Konto für die Umbuchung aus!'
      });

      alertPopup.then(function(res) {
        console.log('Umbuchung nicht durchgeführt');

      });
    }

  };


})

.controller('kreditCtrl', function($scope, $state) {
  $scope.fehlbetrag=window.localStorage.getItem("fehlbetrag");
  $scope.rate=window.localStorage.getItem("rate");
  $scope.laufzeit= window.localStorage.getItem("laufzeit");
$scope.gesamtbetrag=window.localStorage.getItem("amount");

  $scope.saveRate = function(rate){
    console.log(rate);
    window.localStorage.setItem("kreditRate", rate);

  }

  $scope.saveLaufzeit = function(laufzeit){
    console.log(laufzeit);
    window.localStorage.setItem("kreditLaufzeit", laufzeit);
  }

})



.controller('kredit2Ctrl', function($scope,$state,$ionicPopup) {
  $scope.fehlbetrag=window.localStorage.getItem("fehlbetrag");
  $scope.kreditRate=window.localStorage.getItem("kreditRate");
  $scope.kreditLaufzeit= window.localStorage.getItem("kreditLaufzeit");


  $scope.order = function(){
    var alertPopup = $ionicPopup.alert({
      title: 'Kreditantrag erfolgreich',
      template: 'Ihr Kreditbetrag von '+ $scope.fehlbetrag + ' € wurde Ihrem Konto gutgeschrieben!'
    });

    alertPopup.then(function(res) {
      window.localStorage.setItem("Konto1",window.localStorage.getItem("Konto1")+$scope.fehlbetrag)
      console.log('Kreditantrag durchgeführt');
      $state.go('menu.empfehlung');
    });
  }
})
