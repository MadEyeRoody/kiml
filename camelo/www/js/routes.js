angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.kIMLKannIchsMirLeisten', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/kIMLKannIchsMirLeisten.html',
        controller: 'kIMLKannIchsMirLeistenCtrl'
      }
    }
  })

  .state('menu.wunschliste', {
    url: '/wunschliste',
    views: {
      'side-menu21': {
        templateUrl: 'templates/wunschliste.html',
        controller: 'wunschlisteCtrl'
      }
    }
  })

  .state('menu.finanzmanager', {
    url: '/finanzmanger',
    views: {
      'side-menu21': {
        templateUrl: 'templates/finanzmanager.html',
        controller: 'finanzmanagerCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/side-menu21/home')

  

});