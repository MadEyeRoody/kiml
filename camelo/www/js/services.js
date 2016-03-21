angular.module('app.services', [])

.factory('wishlist', function() {
  var wishlist = {};

  wishlist.list = [];

  wishlist.add = function(name, betrag) {
    wishlist.list.push({
      name : name,
      betrag : betrag
    });
  };

  return wishlist;
});
