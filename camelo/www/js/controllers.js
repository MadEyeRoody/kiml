angular.module('app.controllers', ['ionic','ngCordova'])


.controller('kIMLKannIchsMirLeistenCtrl', function($scope, $state,$cordovaBarcodeScanner,$ionicPlatform, $ionicPopup) {

//Start Values
  $scope.formdata = [];
  $scope.formdata.betragValue = NaN;
  window.localStorage.setItem("Konto1", 650 );
  window.localStorage.setItem("Konto2", 500 );
  window.localStorage.setItem("Konto3", 3000 );
  window.localStorage.setItem("rate", 25 );
  window.localStorage.setItem("laufzeit", 18 );
  window.localStorage.setItem("amount",0);
  window.localStorage.setItem("kreditRate", 0);
  window.localStorage.setItem("kreditLaufzeit", 0);
  window.localStorage.setItem("financeType",'ohne');
  //End Start Values

  $scope.checkAmount = function(betrag) {


    betragValue = parseInt(betrag);

    console.log(betragValue);
    if (betragValue >0){
      if (betragValue >= 3980) {
        $state.go('menu.empfehlung3');

      } else if (betrag >= 280 && betrag < 3980) {
        $state.go('menu.empfehlung2');
      } else {
        $state.go('menu.empfehlung');
      }
      window.localStorage.setItem("amount", betragValue)
    } else {
      var alertPopup = $ionicPopup.alert({
        title: 'Kein Betrag eingegeben',
        template: 'Bitte gib einen Betrag ein!'
      });

      alertPopup.then(function(res) {
        //window.localStorage.setItem("Konto1",window.localStorage.getItem("Konto1")+$scope.fehlbetrag)
        console.log('no Input');

      });
    }
    ;
  }
  $scope.scanBarCode = function() {
    $ionicPlatform.ready(function() {
      $cordovaBarcodeScanner
        .scan()
        .then(function(result) {
          $scope.formdata.betragValue=249;
        }, function(error) {
          // An error occurred
          var scanResults = 'Error: ' + error;
          console.log(scanResults);
        });
    });
  };

})




.controller('wunschlisteCtrl', function($scope) {

})

.controller('finanzstatusCtrl', function($scope) {
 $scope.financeType = window.localStorage.getItem("financeType");
})

.controller('empfehlungCtrl', function($scope, $state,$ionicPopup) {
  window.localStorage.setItem("fehlbetrag", 0);
  $scope.amount = window.localStorage.getItem("amount");
  $scope.konto1 = window.localStorage.getItem("Konto1");

  $scope.startFinance = function(){
    window.localStorage.setItem("financeType",'gruen');
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
  window.localStorage.setItem("fehlbetrag", 119);
  $scope.todoChoice = 1;
  $scope.amount = window.localStorage.getItem("amount");
  $scope.konto1 = window.localStorage.getItem("Konto1");

  $scope.startFinance = function(){
    window.localStorage.setItem("financeType",'gelb');
    $state.go('menu.finanzstatus');
  };

  $scope.notify = function(){
    var alertPopup = $ionicPopup.alert({
      title: 'Hinweis',
      template: 'Aufgrund deiner Präferenzen (Minimalbetrag) und noch prognostizerter Abbuchungen fehlen Dir noch 119 €'
    });

    alertPopup.then(function (res) {
      console.log('Information Shown');
    });
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

                $state.go('menu.kIMLKannIchsMirLeisten');

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
    window.localStorage.setItem("fehlbetrag", 1920);
    $scope.todoChoice = 2;
    $scope.amount = window.localStorage.getItem("amount");
    $scope.konto1 = window.localStorage.getItem("Konto1");

    $scope.startFinance = function(){
      window.localStorage.setItem("financeType",'rot');
      $state.go('menu.finanzstatus');
    };

    $scope.notify = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Hinweis',
        template: 'Heute kannst du es dir noch nicht leisten. Dir fehlen noch 1920 €! Es sind keine Umbuchungsmöglichkeiten vorhanden'
      });

      alertPopup.then(function (res) {
        console.log('Information Shown');
      });
    }
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

                  $state.go('menu.kIMLKannIchsMirLeisten');


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
  $scope.kontoChoice = 1;
  $scope.konto1=window.localStorage.getItem("Konto1");
  $scope.konto2=window.localStorage.getItem("Konto2");
  $scope.konto3=window.localStorage.getItem("Konto3");

})

.controller('umbuchungCtrl', function($scope, $ionicPopup, $state) {
  $scope.fehlbetrag=window.localStorage.getItem("fehlbetrag");
  $scope.konto1=window.localStorage.getItem("Konto1");
  $scope.konto2=window.localStorage.getItem("Konto2");
  $scope.konto3=window.localStorage.getItem("Konto3");
  $scope.gesamtbetrag=window.localStorage.getItem("amount");


  $scope.umbuchen = function(kontoChoice){
    var konto = '';
    if(kontoChoice>0) {
      console.log(kontoChoice);
      if (kontoChoice == 1) {
        //$scope.konto1 = $scope.konto1 - $scope.fehlbetrag;
        window.localStorage.setItem("Konto1", $scope.konto1);
        konto = 'Girokonto';
      }
      if (kontoChoice == 2) {
        //$scope.konto2 = $scope.konto2 - $scope.fehlbetrag;
        window.localStorage.setItem("Konto2", $scope.konto2);
        konto = 'Tagesgeldkonto';
      }
      if (kontoChoice == 3) {
        //$scope.konto3 = $scope.konto3 - $scope.fehlbetrag;
        window.localStorage.setItem("Konto3", $scope.konto3);
        konto = 'Gemeinschaftskonto';
      }


      var alertPopup = $ionicPopup.alert({
        title: 'Umbuchung erfolgreich',
        template: 'Vom ' + konto + ' wurden erfolgreich ' + $scope.fehlbetrag + ' € umgebucht!'
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
    window.localStorage.setItem("rate", rate);

  }

  $scope.saveLaufzeit = function(laufzeit){
    console.log(laufzeit);
    window.localStorage.setItem("laufzeit", laufzeit);
  }

})



.controller('kredit2Ctrl', function($scope,$state,$ionicPopup) {
  $scope.fehlbetrag=window.localStorage.getItem("fehlbetrag");
  $scope.rate=window.localStorage.getItem("rate");
  $scope.laufzeit= window.localStorage.getItem("laufzeit");


  $scope.order = function(){
    var alertPopup = $ionicPopup.alert({
      title: 'Kreditantrag erfolgreich',
      template: 'Ihr Kreditbetrag von '+ $scope.fehlbetrag + ' € wurde Ihrem Konto gutgeschrieben!'
    });

    alertPopup.then(function(res) {
      //window.localStorage.setItem("Konto1",window.localStorage.getItem("Konto1")+$scope.fehlbetrag)
      console.log('Kreditantrag durchgeführt');
      $state.go('menu.kIMLKannIchsMirLeisten');
    });
  }
})
