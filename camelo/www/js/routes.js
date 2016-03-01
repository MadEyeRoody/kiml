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

  .state('menu.finanzstatus', {
    url: '/finanzmanger',
    views: {
      'side-menu21': {
        templateUrl: 'templates/finanzstatus.html',
        controller: 'finanzstatusCtrl'
      }
    }
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.empfehlung', {
    url: '/empfehlung',
    views: {
      'side-menu21': {
        templateUrl: 'templates/empfehlung.html',
        controller: 'empfehlungCtrl'
      }
    }
  })

  .state('menu.empfehlung2', {
    url: '/empfehlung2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/empfehlung2.html',
        controller: 'empfehlung2Ctrl'
      }
    }
  })

  .state('menu.kontoverwaltung', {
    url: '/kontoverwaltung',
    views: {
      'side-menu21': {
        templateUrl: 'templates/kontoverwaltung.html',
        controller: 'kontoverwaltungCtrl'
      }
    }
  })

  .state('menu.umbuchung', {
    url: '/umbuchung',
    views: {
      'side-menu21': {
        templateUrl: 'templates/umbuchung.html',
        controller: 'umbuchungCtrl'
      }
    }
  })

  .state('menu.kredit', {
    url: '/kredit',
    views: {
      'side-menu21': {
        templateUrl: 'templates/kredit.html',
        controller: 'kreditCtrl'
      }
    }
  })

  .state('menu.kredit2', {
    url: '/kreditangebot',
    views: {
      'side-menu21': {
        templateUrl: 'templates/kredit2.html',
        controller: 'kredit2Ctrl'
      }
    }
  })

$urlRouterProvider.otherwise('/menu/home')

  

});