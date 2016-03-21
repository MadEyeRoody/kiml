angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('menu.home', {
      url: '/home',
      cache: false,
      views: {
        'side-menu21': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })

      .state('menu.kIMLKannIchsMirLeisten', {
    url: '/kIMLKannIchsMirLeisten',
        cache: false,
        views: {
      'side-menu21': {
        templateUrl: 'templates/kIMLKannIchsMirLeisten.html',
        controller: 'kIMLKannIchsMirLeistenCtrl'
      }
    }
  })

  .state('menu.wunschliste', {
    url: '/wunschliste',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/wunschliste.html',
        controller: 'wunschlisteCtrl'
      }
    }
  })

  .state('menu.finanzstatus', {
    url: '/finanzmanger',
    cache: false,
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
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/empfehlung.html',
        controller: 'empfehlungCtrl'
      }
    }
  })

  .state('menu.empfehlung2', {
    url: '/empfehlung2',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/empfehlung2.html',
        controller: 'empfehlung2Ctrl'
      }
    }
  })

    .state('menu.empfehlung3', {
      url: '/empfehlung3',
      cache: false,
      views: {
        'side-menu21': {
          templateUrl: 'templates/empfehlung3.html',
          controller: 'empfehlung3Ctrl'
        }
      }
    })

  .state('menu.kontoverwaltung', {
    url: '/kontoverwaltung',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/kontoverwaltung.html',
        controller: 'kontoverwaltungCtrl'
      }
    }
  })
    .state('menu.impressum', {
      url: '/impressum',
      cache: false,
      views: {
        'side-menu21': {
          templateUrl: 'templates/impressum.html',
          controller: 'impressumCtrl'
        }
      }
    })

  .state('menu.umbuchung', {
    url: '/umbuchung',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/umbuchung.html',
        controller: 'umbuchungCtrl'
      }
    }
  })

  .state('menu.kredit', {
    url: '/kredit',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/kredit.html',
        controller: 'kreditCtrl'
      }
    }
  })

  .state('menu.kredit2', {
    url: '/kreditangebot',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/kredit2.html',
        controller: 'kredit2Ctrl'
      }
    }
  })

  .state('menu.addWunsch', {
    url: '/addWunsch',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/addWunsch.html',
        controller: 'addWunschCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/menu/home')



});
