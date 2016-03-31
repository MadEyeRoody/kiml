angular.module('app.services', [])

.factory('wishlist', function() {
  var wishlist = {};

  wishlist.list = [];

  wishlist.add = function(name, betrag, beschreibung) {
    wishlist.list.push({
      name : name,
      betrag : betrag,
      beschreibung : beschreibung
    });
  };

  return wishlist;
})

.factory('empfehlung', function($state,$ionicPopup) {
  var empfehlung = {};
  
  empfehlung.showEmpfehlung = function(name, betrag) {
	var betragValue = parseFloat(betrag);
	var prognose = parseFloat(window.localStorage.getItem("prognose"));
	var minRemaining = parseFloat(window.localStorage
		.getItem("minRemaining"));
	var konto1Value = parseFloat(window.localStorage.getItem("Konto1"));
	var konto2Value = parseFloat(window.localStorage.getItem("Konto2"));
	var konto3Value = parseFloat(window.localStorage.getItem("Konto3"));
	var kontoGesamtValue = konto1Value + konto2Value + konto3Value;
	var kontoPrimeValue = parseFloat(window.localStorage
		.getItem("Konto" + window.localStorage.getItem("primeKonto")));

	console.log(betragValue);
	if (betragValue > 0) {
	  if ((kontoPrimeValue - (betragValue + prognose)) >= minRemaining) {
		$state.go('menu.empfehlung');

	  } else if ((kontoGesamtValue - (betragValue + prognose)) >= minRemaining) {
		$state.go('menu.empfehlung2');
	  } else if ((kontoGesamtValue - (betragValue + prognose)) < minRemaining) {
		$state.go('menu.empfehlung3');
	  }
	  window.localStorage.setItem("amount", betragValue);
	  window.localStorage.setItem("name", name);
	} else {

	  var alertPopup = $ionicPopup.alert({
		title : 'Kein Betrag eingegeben',
		template : 'Bitte gib einen Betrag ein!'
	  });

	  alertPopup.then(function(res) {
		// window.localStorage.setItem("Konto1",window.localStorage.getItem("Konto1")+$scope.fehlbetrag)
		console.log('no Input');

	  });
	}
	;
  };

  return empfehlung;
});

