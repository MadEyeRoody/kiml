angular.module('app.controllers')
    .controller(
        'multiChartCtrl',
        function($scope) {
          $scope.init = function(value, legend) {
            $scope.options = {
              chart : {
                type : 'lineChart',
                height : value,
                duration : 1,
                showLegend : legend,
                legendPosition : 'right',
                margin : {
                  left : 50
                },

                duration : 700,
                forceY : 0.00,
                xAxis : {
                  tickValues : tickMarks,
                  tickFormat : function(d) {
                    return d3.time.format("%b")(new Date(d));
                  }
                },
                yAxis : {
                  tickFormat : function(d) {
                    return d3.format("$ , .2f")(d);
                  }
                },

              }
            };
            update();
          }

          var financeType = window.localStorage.getItem("financeType");
          $scope.financeType = financeType;
          var kaufbetrag = parseFloat(window.localStorage.getItem("amount"));
          var gesamtsaldo = parseFloat(window.localStorage
              .getItem("gesamtsaldo"));
          var disabled = false;
          var colorPrime = "orange";
          var colorGesamt = "orange";
          var areaPrime = true;
          var areaGesamt = true;

          var tickMarks = [ new Date(2016, 0, 1), new Date(2016, 1, 1),
              new Date(2016, 2, 1), new Date(2016, 3, 1), new Date(2016, 4, 1),
              new Date(2016, 5, 1), new Date(2016, 6, 1), new Date(2016, 7, 1),
              new Date(2016, 8, 1), new Date(2016, 9, 1),
              new Date(2016, 10, 1), new Date(2016, 11, 1) ]

          $scope.config = {

            deepWatchData : true,
            deepWatchDataDepth : 2,
          }

          $scope.events = {
            doRefresh : function(e, scope) {
              update().then(function(response) {
                console.log("callback");
                scope.api.clearElement();
                scope.api.update();
              })

            }
          }
          $scope.update = function() {
            if (window.localStorage.getItem('refresh') == 1) {
              update();
              window.localStorage.setItem('refresh', 0)
            }
          }

          function update(callback) {
            var financeType = window.localStorage.getItem("financeType");
            var kaufbetrag = parseFloat(window.localStorage.getItem("amount"));
            var gesamtsaldo = parseFloat(window.localStorage
                .getItem("gesamtsaldo"));
            var saldoPrime = parseFloat(window.localStorage.getItem("Konto"
                + window.localStorage.getItem("primeKonto")));

            console.log(financeType);

            if (financeType == "gelb" || financeType == "rot") {
              disabled = false;
            } else {
              disabled = true;
            }

            if (financeType == "gelb") {
              colorPrime = "red";
              colorGesamt = "green";
              areaPrime = true;
              areaGesamt = true;
            } else if (financeType == "rot") {
              colorPrime = "red";
              colorGesamt = "red";
              areaPrime = true;
              areaGesamt = true;
            } else if (financeType == "gruen") {
              colorPrime = "green";
              colorGesamt = "orange";
              areaPrime = true;
              areaGesamt = false;
            } else if (financeType == "ohne") {
              colorPrime = "orange";
              colorGesamt = "orange";
              areaPrime = false;
              areaGesamt = false;
            }
            var n = new Date();
            n.setDate(1);
            $scope.data = [

            {
              "key" : "Saldo über alle Konten",
              area : true,
              yAxis : 1,
              disabled : disabled,
              "color" : "lightblue",
              "values" : [ {
                "x" : new Date(2016, 0, 1),
                "y" : gesamtsaldo + 1900
              }, {
                "x" : new Date(2016, 0, 3),
                "y" : 1300 + gesamtsaldo
              }, {
                "x" : new Date(2016, 0, 8),
                "y" : 1020 + gesamtsaldo
              }, {
                "x" : new Date(2016, 0, 12),
                "y" : 1070 + gesamtsaldo
              }, {
                "x" : new Date(2016, 0, 17),
                "y" : 1000 + gesamtsaldo
              }, {
                "x" : new Date(2016, 0, 23),
                "y" : 850 + gesamtsaldo
              }, {
                "x" : new Date(2016, 1, 01),
                "y" : 3050 + gesamtsaldo
              }, {
                "x" : new Date(2016, 1, 2),
                "y" : 2250 + gesamtsaldo
              },

              {
                "x" : new Date(2016, 1, 12),
                "y" : 1620 + gesamtsaldo
              }, {
                "x" : new Date(2016, 1, 14),
                "y" : 1120 + gesamtsaldo
              },

              {
                "x" : new Date(2016, 1, 22),
                "y" : 420 + gesamtsaldo
              },

              {
                "x" : new Date(2016, 2, 1),
                "y" : 2020 + gesamtsaldo
              }, {
                "x" : new Date(2016, 2, 3),
                "y" : 1620 + gesamtsaldo
              }, {
                "x" : new Date(2016, 2, 5),
                "y" : 1220 + gesamtsaldo
              },

              {
                "x" : new Date(2016, 2, 11),
                "y" : 820 + gesamtsaldo
              },

              {
                "x" : new Date(2016, 2, 22),
                "y" : 200 + gesamtsaldo
              }, {
                "x" : new Date(2016, 3, 1),
                "y" : 1700 + gesamtsaldo
              }, {
                "x" : new Date(2016, 3, 3),
                "y" : 1100 + gesamtsaldo
              }, {
                "x" : new Date(2016, 3, 5),
                "y" : 540 + gesamtsaldo
              }, {
                "x" : new Date(2016, 3, 11),
                "y" : gesamtsaldo
              } ]
            }, {
              "key" : "Saldo Primärkonto",
              area : true,
              yAxis : 1,

              "color" : "#0066B3",
              "values" : [ {
                "x" : new Date(2016, 0, 1),
                "y" : saldoPrime + 1500
              }, {
                "x" : new Date(2016, 0, 3),
                "y" : 900 + saldoPrime
              }, {
                "x" : new Date(2016, 0, 8),
                "y" : 820 + saldoPrime
              }, {
                "x" : new Date(2016, 0, 12),
                "y" : 670 + saldoPrime
              }, {
                "x" : new Date(2016, 0, 17),
                "y" : 634 + saldoPrime
              }, {
                "x" : new Date(2016, 0, 23),
                "y" : 550 + saldoPrime
              }, {
                "x" : new Date(2016, 0, 27),
                "y" : 350 + saldoPrime
              }, {
                "x" : new Date(2016, 1, 01),
                "y" : 2350 + saldoPrime
              }, {
                "x" : new Date(2016, 1, 2),
                "y" : 2050 + saldoPrime
              }, {
                "x" : new Date(2016, 1, 10),
                "y" : 1920 + saldoPrime
              }, {
                "x" : new Date(2016, 1, 12),
                "y" : 920 + saldoPrime
              }, {
                "x" : new Date(2016, 1, 14),
                "y" : 720 + saldoPrime
              }, {
                "x" : new Date(2016, 1, 16),
                "y" : 800 + saldoPrime
              }, {
                "x" : new Date(2016, 1, 22),
                "y" : 220 + saldoPrime
              }, {
                "x" : new Date(2016, 1, 25),
                "y" : 120 + saldoPrime
              }, {
                "x" : new Date(2016, 2, 1),
                "y" : 1620 + saldoPrime
              }, {
                "x" : new Date(2016, 2, 3),
                "y" : 1020 + saldoPrime
              }, {
                "x" : new Date(2016, 2, 5),
                "y" : 820 + saldoPrime
              }, {
                "x" : new Date(2016, 2, 9),
                "y" : 570 + saldoPrime
              }, {
                "x" : new Date(2016, 2, 11),
                "y" : 420 + saldoPrime
              }, {
                "x" : new Date(2016, 2, 16),
                "y" : 270 + saldoPrime
              }, {
                "x" : new Date(2016, 2, 22),
                "y" : saldoPrime - 200
              }, {
                "x" : new Date(2016, 3, 1),
                "y" : 1300 + saldoPrime
              }, {
                "x" : new Date(2016, 3, 3),
                "y" : 700 + saldoPrime
              }, {
                "x" : new Date(2016, 3, 5),
                "y" : 340 + saldoPrime
              }, {
                "x" : new Date(2016, 3, 11),
                "y" : saldoPrime
              } ]
            },

            {
              "key" : "Kaufprognose aller Konten",
              type : 'line',
              yAxis : 1,
              area : areaGesamt,
              "color" : colorGesamt,
              disabled : disabled,
              classed : 'dashed',
              "values" : [

              {
                "x" : new Date(2016, 3, 11),
                "y" : gesamtsaldo
              }, {
                "x" : new Date(2016, 3, 13),
                "y" : gesamtsaldo - kaufbetrag
              }, {
                "x" : new Date(2016, 3, 17),
                "y" : gesamtsaldo - kaufbetrag - 20
              }, {
                "x" : new Date(2016, 3, 22),
                "y" : gesamtsaldo - kaufbetrag - 80
              }, {
                "x" : new Date(2016, 3, 26),
                "y" : gesamtsaldo - kaufbetrag - 102
              }, {
                "x" : new Date(2016, 4, 1),
                "y" : gesamtsaldo - kaufbetrag + 1350
              }, {
                "x" : new Date(2016, 4, 3),
                "y" : gesamtsaldo - kaufbetrag + 250
              }, {
                "x" : new Date(2016, 4, 17),
                "y" : gesamtsaldo - kaufbetrag + 30
              }, {
                "x" : new Date(2016, 4, 17),
                "y" : gesamtsaldo - kaufbetrag - 50
              }, {
                "x" : new Date(2016, 4, 22),
                "y" : gesamtsaldo - kaufbetrag + -200
              }, {
                "x" : new Date(2016, 4, 26),
                "y" : gesamtsaldo - kaufbetrag + -142
              }, {
                "x" : new Date(2016, 5, 1),
                "y" : gesamtsaldo - kaufbetrag + 1350
              },

              ]
            }, {
              "key" : "Kaufprognose Primärkonto",
              type : 'line',
              yAxis : 1,
              area : areaPrime,
              "color" : colorPrime,
              classed : 'dashed',
              "values" : [

              {
                "x" : new Date(2016, 3, 11),
                "y" : saldoPrime
              }, {
                "x" : new Date(2016, 3, 13),
                "y" : saldoPrime - kaufbetrag
              }, {
                "x" : new Date(2016, 3, 17),
                "y" : saldoPrime - kaufbetrag - 20
              }, {
                "x" : new Date(2016, 3, 22),
                "y" : saldoPrime - kaufbetrag - 80
              }, {
                "x" : new Date(2016, 3, 26),
                "y" : saldoPrime - kaufbetrag - 202
              }, {
                "x" : new Date(2016, 4, 1),
                "y" : saldoPrime - kaufbetrag + 1150
              }, {
                "x" : new Date(2016, 4, 3),
                "y" : saldoPrime - kaufbetrag + 450
              }, {
                "x" : new Date(2016, 4, 17),
                "y" : saldoPrime - kaufbetrag + 30
              }, {
                "x" : new Date(2016, 4, 17),
                "y" : saldoPrime - kaufbetrag - 50
              }, {
                "x" : new Date(2016, 4, 22),
                "y" : saldoPrime - kaufbetrag + -70
              }, {
                "x" : new Date(2016, 4, 26),
                "y" : saldoPrime - kaufbetrag + -142
              }, {
                "x" : new Date(2016, 5, 1),
                "y" : saldoPrime - kaufbetrag + 1450
              },

              ]
            }, {

              "key" : "Mindestgrenze",
              type : 'line',
              yAxis : 1,
              "color" : "green",
              "values" : [ {
                "x" : new Date(2016, 0, 1),
                "y" : parseFloat(window.localStorage.getItem("minRemaining"))
              }, {
                "x" : new Date(2016, 5, 1),
                "y" : parseFloat(window.localStorage.getItem("minRemaining"))
              } ]
            }

            ];

            return new Promise(function(resolve, reject) {
              resolve();
            });
          }
        });