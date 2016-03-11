angular.module('app.controllers', ['ionic','ngCordova','nvd3'])


  .controller('kIMLKannIchsMirLeistenCtrl', function($scope, $state,$cordovaBarcodeScanner,$ionicPlatform, $ionicPopup) {
    var deviceInformation = ionic.Platform.device();
    var isAndroid = ionic.Platform.isAndroid();

    if(isAndroid) {
      $scope.barcodeScannerVisibility=true;
    }
    else {
      $scope.barcodeScannerVisibility=false;
    }

    //Start Values
    $scope.formdata = [];
    $scope.formdata.betragValue = NaN;
    window.localStorage.setItem("Konto1", 652.00 );
    window.localStorage.setItem("Konto1Bez", 'Girokonto' );
    window.localStorage.setItem("Konto1IBAN", 'DE 11 7019 0000 0000 0089 74' );
    window.localStorage.setItem("Konto2", 521.00 );
    window.localStorage.setItem("Konto2Bez", 'Tagesgeldkonto' );
    window.localStorage.setItem("Konto2IBAN", 'DE 40 7919 0000 0001 5311 58' );
    window.localStorage.setItem("Konto3", 3234.00 );
    window.localStorage.setItem("Konto3Bez", 'Gemeinschaftskonto' );
    window.localStorage.setItem("Konto3IBAN", 'DE 46 1009 0900 0887 5754 33' );
    window.localStorage.setItem("primeKonto", 1 );
    window.localStorage.setItem("laufzeit", 18);
    window.localStorage.setItem("amount",0);
    window.localStorage.setItem("financeType",'ohne');
    window.localStorage.setItem("prognose", 89.00);
    window.localStorage.setItem("prognoseReason", 'Versicherungen');
    window.localStorage.setItem("minRemaining", 200.00);
    //End Start Values
    console.log(window.localStorage.getItem("minRemaining"));
    $scope.checkAmount = function(betrag) {

      betragValue = parseFloat(betrag);
      prognose = parseFloat(window.localStorage.getItem("prognose"));
      minRemaining = parseFloat(window.localStorage.getItem("minRemaining"));
      konto1Value = parseFloat(window.localStorage.getItem("Konto1"));
      konto2Value = parseFloat(window.localStorage.getItem("Konto2"));
      konto3Value = parseFloat(window.localStorage.getItem("Konto3"));
      kontoGesamtValue = konto1Value + konto2Value + konto3Value;

      console.log(betragValue);
      if (betragValue>0){
        if ((konto1Value - (betragValue+prognose))>=minRemaining) {
          $state.go('menu.empfehlung');

        } else if ((kontoGesamtValue - (betragValue + prognose))>=minRemaining) {
          $state.go('menu.empfehlung2');
        } else if((kontoGesamtValue - (betragValue + prognose))< minRemaining) {
          $state.go('menu.empfehlung3');
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
            $scope.formdata.betragValue=150;
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

  .controller('impressumCtrl', function($scope) {

  })

  .controller('finanzstatusCtrl', function($scope) {
    //$scope.financeType = window.localStorage.getItem("financeType");
    $scope.$broadcast('doRefresh');


    var gesamtsaldo = parseFloat(window.localStorage.getItem("Konto1"))+
      parseFloat(window.localStorage.getItem("Konto2"))+
      parseFloat(window.localStorage.getItem("Konto3"));

    window.localStorage.setItem("gesamtsaldo", gesamtsaldo);

    $scope.resetFinanceType= function(){
      window.localStorage.setItem("financeType", "ohne");
      window.localStorage.setItem("amount",0);
      $scope.$broadcast('doRefresh');

    }
  })

  .controller('empfehlungCtrl', function($scope, $state,$ionicPopup) {
    window.localStorage.setItem('refresh',1)
    $scope.amount = parseFloat(window.localStorage.getItem("amount"));
    $scope.konto1 = parseFloat((window.localStorage.getItem("Konto1")));
    $scope.prognose = parseFloat((window.localStorage.getItem("prognose")));
    $scope.erwarteterStand = (Math.round(($scope.konto1 - ($scope.amount + $scope.prognose))*100)/100).toFixed(2);
    $scope.amount=$scope.amount.toFixed(2);
    console.log($scope.erwarteterStand);
    $scope.startFinance = function(){
      window.localStorage.setItem("financeType",'gruen');
      $state.go('menu.finanzstatus');
    };

    $scope.changeTodo = function(target){
      $scope.wishlist = target;
    }
    $scope.doneGreen = function(choice){
      choice = $scope.wishlist;
      if(choice){
        var myPopup = $ionicPopup.show({
          template: '<input type="text">',
          title: 'Zur Wunschliste hinzufügen',
          subTitle: 'Gib einen Namen für diesen Wunsch ein',
          scope: $scope,
          buttons: [
            { text: 'Abbrechen' },
            {
              text: 'Speichern',
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
    $scope.todoChoice = "1";
    window.localStorage.setItem('refresh',1)
    $scope.amount = parseFloat((window.localStorage.getItem("amount")));
    $scope.konto1 = parseFloat((window.localStorage.getItem("Konto1")));
    $scope.prognose = parseFloat((window.localStorage.getItem("prognose")));
    $scope.minAmount = parseFloat((window.localStorage.getItem("minRemaining")));
    $scope.erwarteterStand = (Math.round(($scope.konto1 - ($scope.amount + $scope.prognose))*100)/100).toFixed(2);
    $scope.fehlbetrag = (-($scope.erwarteterStand - $scope.minAmount)).toFixed(2);
    window.localStorage.setItem("fehlbetrag", $scope.fehlbetrag);
    $scope.amount=$scope.amount.toFixed(2);

    $scope.startFinance = function(){
      window.localStorage.setItem("financeType",'gelb');
      $state.go('menu.finanzstatus');
    };

    $scope.notify = function(){
      var alertPopup = $ionicPopup.alert({
        title: 'Hinweis',
        template: 'Aufgrund Deiner Präferenzen (Minimalbetrag: '+ $scope.minAmount.toFixed(2) +' €) und noch prognostizerter Abbuchungen ('+$scope.prognose.toFixed(2)+' € für Versicherungen) fehlen Dir ' +$scope.fehlbetrag+' €'
      });

      alertPopup.then(function (res) {
        console.log('Information Shown');
      });
    };

    $scope.changeTodo = function(target){
      $scope.todoChoice = target;
    }

    $scope.doneYellow = function(){
      target = $scope.todoChoice;
      if(target>0) {
        console.log(target);
        if (target == 1) {
          var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="wishlist">',
            title: 'Zur Wunschliste hinzufügen',
            subTitle: 'Gib einen Namen für diesen Wunsch ein',
            scope: $scope,
            buttons: [
              { text: 'Abbrechen' },
              {
                text: 'Speichern',
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
        }
        if (target == 2) {
          $state.go('menu.umbuchung');
        }
        if (target == 3) {
          $state.go('menu.kredit')
        }

      }



    };

  })

  .controller('empfehlung3Ctrl', function($scope, $state,$ionicPopup) {
    $scope.todoChoice = 1;
    window.localStorage.setItem('refresh',1)
    $scope.amount = parseFloat((window.localStorage.getItem("amount")));
    $scope.konto1 = parseFloat((window.localStorage.getItem("Konto1")));
    $scope.prognose = parseFloat((window.localStorage.getItem("prognose")));
    $scope.minAmount = parseFloat((window.localStorage.getItem("minRemaining")));
    $scope.erwarteterStand = (Math.round(($scope.konto1 - ($scope.amount + $scope.prognose))*100)/100).toFixed(2);
    $scope.fehlbetrag = (-($scope.erwarteterStand - $scope.minAmount)).toFixed(2);
    window.localStorage.setItem("fehlbetrag", $scope.fehlbetrag);
    $scope.amount=$scope.amount.toFixed(2);

    $scope.startFinance = function(){
      window.localStorage.setItem("financeType",'rot');
      $state.go('menu.finanzstatus');
    };

    $scope.notify = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Hinweis',
        template: 'Heute kannst du es dir noch nicht leisten. Dir fehlen noch '+$scope.fehlbetrag+' €! Es sind keine Umbuchungsmöglichkeiten vorhanden'
      });

      alertPopup.then(function (res) {
        console.log('Information Shown');
      });
    }
    $scope.changeTodo = function(target){
      $scope.todoChoice = target;
    }

    $scope.doneYellow = function(){

      target = $scope.todoChoice;

      if(target>0) {
        console.log(target);
        if (target == 1) {
          var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="wishlist">',
            title: 'Zur Wunschliste hinzufügen',
            subTitle: 'Gib einen Namen für diesen Wunsch ein',
            scope: $scope,
            buttons: [
              { text: 'Abbrechen' },
              {
                text: 'Speichern',
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
        }
        if (target == 2) {
          $state.go('menu.kredit')
        }

      }



    };

  })

  .controller('kontoverwaltungCtrl', function($scope) {
    $scope.kontoChoice = parseInt(window.localStorage.getItem("primeKonto"));
    $scope.konto1=parseFloat(window.localStorage.getItem("Konto1")).toFixed(2);
    $scope.konto1Bez=window.localStorage.getItem("Konto1Bez");
    $scope.konto1IBAN=window.localStorage.getItem("Konto1IBAN");
    $scope.konto2=parseFloat(window.localStorage.getItem("Konto2")).toFixed(2);
    $scope.konto2Bez=window.localStorage.getItem("Konto2Bez");
    $scope.konto2IBAN=window.localStorage.getItem("Konto2IBAN");
    $scope.konto3=parseFloat(window.localStorage.getItem("Konto3")).toFixed(2);
    $scope.konto3Bez=window.localStorage.getItem("Konto3Bez");
    $scope.konto3IBAN=window.localStorage.getItem("Konto3IBAN");
    $scope.minRemaining=parseFloat(window.localStorage.getItem("minRemaining")).toFixed(2);

    $scope.save=function(choice, untergrenze){
      window.localStorage.setItem("primeKonto", choice );
      window.localStorage.setItem("minRemaining",untergrenze);
    };

  })

  .controller('umbuchungCtrl', function($scope, $ionicPopup, $state) {
    $scope.fehlbetrag=parseFloat(window.localStorage.getItem("fehlbetrag"));
    $scope.konto1=parseFloat(window.localStorage.getItem("Konto1")).toFixed(2);
    $scope.konto2=parseFloat(window.localStorage.getItem("Konto2")).toFixed(2);
    $scope.konto3=parseFloat(window.localStorage.getItem("Konto3")).toFixed(2);
    $scope.gesamtbetrag=parseFloat(window.localStorage.getItem("amount")).toFixed(2);


    $scope.umbuchen = function(kontoChoice){
      var konto = '';
      if(kontoChoice>0) {
        console.log(kontoChoice);
        if (kontoChoice == 1) {
          $scope.konto1 = (parseFloat($scope.konto1) - parseFloat($scope.fehlbetrag)).toFixed(2);
          window.localStorage.setItem("Konto1", $scope.konto1);

          konto = 'Girokonto';
        }
        if (kontoChoice == 2) {
          $scope.konto2 = (parseFloat($scope.konto2) - parseFloat($scope.fehlbetrag)).toFixed(2);
          window.localStorage.setItem("Konto2", $scope.konto2);
          konto = 'Tagesgeldkonto';
        }
        if (kontoChoice == 3) {
          $scope.konto3 = (parseFloat($scope.konto3) - parseFloat($scope.fehlbetrag)).toFixed(2);
          window.localStorage.setItem("Konto3", $scope.konto3);
          konto = 'Gemeinschaftskonto';
        }


        var alertPopup = $ionicPopup.alert({
          title: 'Umbuchung erfolgreich',
          template: 'Vom ' + konto + ' wurden erfolgreich ' + $scope.fehlbetrag.toFixed(2) + ' € umgebucht!'

        });

        alertPopup.then(function (res) {
          console.log('Umbuchung durchgefÃ¼hrt');
          $state.go('menu.empfehlung');
        });

        $scope.fehlbetrag = 0;
        window.localStorage.setItem("fehlbetrag", $scope.fehlbetrag.toFixed(2));
      }else {
        var alertPopup = $ionicPopup.alert({
          title: 'Kein Konto ausgewÃ¤hlt',
          template: 'Bitte wÃ¤hlen Sie ein Konto für die Umbuchung aus!'
        });

        alertPopup.then(function(res) {
          console.log('Umbuchung nicht durchgefÃ¼hrt');

        });
      }

    };


  })

  .controller('kreditCtrl', function($scope, $state) {
    $scope.fehlbetrag=parseFloat(window.localStorage.getItem("fehlbetrag")).toFixed(2);
    $scope.laufzeit= parseFloat(window.localStorage.getItem("laufzeit"));
    $scope.gesamtbetrag=parseFloat(window.localStorage.getItem("amount")).toFixed(2);


    $scope.rate =Math.round(100.0 * (parseFloat($scope.fehlbetrag)/ $scope.laufzeit)) / 100.0; ;

    $scope.saveLaufzeit = function(laufzeit){
      console.log(laufzeit);
      window.localStorage.setItem("laufzeit", laufzeit);
      $scope.rate =Math.round(100.0 * (parseFloat($scope.fehlbetrag)/ laufzeit)) / 100.0; ;
      console.log($scope.rate);
      $scope.$apply();
      window.localStorage.setItem("rate", $scope.rate.toFixed(2));

    }

  })



  .controller('kredit2Ctrl', function($scope,$state,$ionicPopup) {
    $scope.fehlbetrag=parseFloat(window.localStorage.getItem("fehlbetrag")).toFixed(2);
    $scope.rate=window.localStorage.getItem("rate");
    $scope.laufzeit= window.localStorage.getItem("laufzeit");


    $scope.order = function(){
      var alertPopup = $ionicPopup.alert({
        title: 'Kreditantrag erfolgreich',
        template: 'Ihr Kreditbetrag von '+ $scope.fehlbetrag + ' € wurde Ihrem Konto gutgeschrieben!'
      });

      alertPopup.then(function(res) {
        window.localStorage.setItem("Konto1",parseFloat(window.localStorage.getItem("Konto1")).toFixed(2)+$scope.fehlbetrag)
        console.log('Kreditantrag durchgefÃ¼hrt');
        $state.go('menu.empfehlung');
      });
    }
  })


  .controller('multiChartCtrl', function($scope){
    var financeType = window.localStorage.getItem("financeType");
    $scope.financeType = financeType;
    var kaufbetrag = parseFloat(window.localStorage.getItem("amount"));
    var gesamtsaldo = parseFloat(window.localStorage.getItem("gesamtsaldo"));
    var saldoPrime = parseFloat(window.localStorage.getItem("Konto1"));
    var disabled = false;
    var colorPrime= "orange";
    var colorGesamt= "orange";
    var areaPrime = true;
    var areaGesamt = true;


    console.log(kaufbetrag);

    var tickMarks = [new Date(2016,0,1),new Date(2016,1,1),new Date(2016,2,1),
      new Date(2016,3,1),new Date(2016,4,1),new Date(2016,5,1),new Date(2016,6,1),
      new Date(2016,7,1),new Date(2016,8,1),new Date(2016,9,1),new Date(2016,10,1),new Date(2016,11,1)]



    $scope.config = {

      deepWatchData: true,
      deepWatchDataDepth: 2,
    }


    $scope.options = {
      chart: {
        type: 'lineChart',
        height: 550,
        duration:1,
        margin : {
          left: 50

        },

        duration: 700,
        forceY:0.00,
        xAxis: {
          tickValues: tickMarks,
          tickFormat: function(d){
            return d3.time.format("%b")(new Date(d));
          }
        },
        yAxis: {
          tickFormat: function(d){
            return d3.format("$ , .2f")(d);
          }
        },

      }
    };
    update();



    $scope.events={
      doRefresh: function(e,scope){
        update().then(function(response){
          console.log("callback");
          scope.api.clearElement();
          scope.api.update();
        })

      }
    }
    $scope.update = function(){
      if(window.localStorage.getItem('refresh')==1) {
        update();
        window.localStorage.setItem('refresh',0)
      }
    }

    function update (callback){
      var financeType = window.localStorage.getItem("financeType");
      var kaufbetrag = parseFloat(window.localStorage.getItem("amount"));
      var gesamtsaldo = parseFloat(window.localStorage.getItem("gesamtsaldo"));
      var saldoPrime = parseFloat(window.localStorage.getItem("Konto1"));
      console.log(kaufbetrag,gesamtsaldo,saldoPrime);

      if(financeType == "gelb" || financeType == "rot"){
        disabled = false;
      }else {
        disabled = true;
      }

      if (financeType== "gelb" ){
        colorPrime = "red";
        colorGesamt= "green";
        areaPrime = true;
        areaGesamt = true;
      } else if (financeType == "rot") {
        colorPrime= "red";
        colorGesamt="red";
        areaPrime = true;
        areaGesamt = true;
      } else if(financeType=="gruen"){
        colorPrime= "green";
        colorGesamt="orange";
        areaPrime = true;
        areaGesamt = false;
      } else if (financeType== "ohne") {
        colorPrime= "orange";
        colorGesamt="orange";
        areaPrime = false;
        areaGesamt = false;
      }
      var n = new Date();
      n.setDate(1);
      $scope.data = [


        {
          "key": "Saldo über alle Konten",
          area: true,
          yAxis: 1,
          disabled: disabled,
          "color": "lightblue",
          "values": [
            {
              "x": new Date(2016,0,1),
              "y": 600 + gesamtsaldo,
            },
            {
              "x": new Date(2016,0,30),
              "y": -200 + gesamtsaldo,
            },
            {
              "x":  new Date(2016,1,22),
              "y": 920 + gesamtsaldo,
            },
            {
              "x":  new Date(2016,2,1),
              "y": -160 + gesamtsaldo
            },
            {
              "x":  new Date(),
              "y": gesamtsaldo
            }
          ]
        },{
          "key": "Saldo Primärkonto",
          area: true,
          yAxis: 1,

          "color": "#0066B3",
          "values": [
            {
              "x": new Date(2016,0,1),
              "y": 200 +saldoPrime
            },
            {
              "x": new Date(2016,0,23),
              "y": 900 +saldoPrime
            },
            {
              "x":  new Date(2016,1,22),
              "y": 720 + saldoPrime
            },
            {
              "x":  new Date(2016,2,1),
              "y": 460 +saldoPrime
            },
            {
              "x":  new Date(),
              "y": saldoPrime
            }
          ]
        },



        {
          "key": "Kaufprognose aller Konten",
          type: 'line',
          yAxis: 1,
          area:areaGesamt,
          "color": colorGesamt,
          disabled: disabled,
          classed:'dashed',
          "values": [

            {
              "x": new Date(),
              "y": gesamtsaldo
            },
            {
              "x": new Date(2016,4,1),
              "y": gesamtsaldo-kaufbetrag
            },
            {
              "x":  new Date(2016,5,1),
              "y": gesamtsaldo-kaufbetrag-170
            },
            {
              "x":  new Date(2016,6,1),
              "y": gesamtsaldo-kaufbetrag+500
            }
          ]
        },{
          "key": "Kaufprognose Primärkonto",
          type: 'line',
          yAxis: 1,
          area:areaPrime,
          "color": colorPrime,
          classed:'dashed',
          "values": [

            {
              "x": new Date(),
              "y": saldoPrime
            },
            {
              "x": new Date(2016,4,1),
              "y": saldoPrime-kaufbetrag
            },
            {
              "x":  new Date(2016,5,1),
              "y": saldoPrime-kaufbetrag - 89
            },
            {
              "x":  new Date(2016,6,1),
              "y": saldoPrime-kaufbetrag + 300
            }
          ]
        },
        {

          "key": "Mindestgrenze",
          type: 'line',
          yAxis: 1,
          "color": "green",
          "values": [
            {
              "x": new Date(2016,0,1),
              "y": 200
            },
            {
              "x":  new Date(2016,6,1),
              "y": 200
            }
          ]
        }


      ];


      return new Promise(function(resolve,reject){
        resolve();
      });

    }

  })



