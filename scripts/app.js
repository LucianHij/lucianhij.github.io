angular.module('app', ['ui.router', 'ngMaterial', 'angularGrid', 'ngMap',])
.config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', 
  function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './views/map.html',
      title: "Map",
      controller: 'MapCtrl as mapVm'
    })

    .state('gallery', {
      url: '/gallery',
      templateUrl: './views/gallery.html',
      title: "Gallery",
      controller: 'GalleryCtrl as gallVm'
    })

    .state('about', {
      url: '/about',
      templateUrl: './views/about.html',
      title: "About"
    });

    $urlRouterProvider.otherwise('/');

    var userTheme = localStorage.getItem('theme');
    if (userTheme === null) {
      $mdThemingProvider.theme('default').primaryPalette('red');
    }
    else {
      $mdThemingProvider.theme('default').primaryPalette(userTheme);
    }

    $mdThemingProvider.theme('red').primaryPalette('red');
    $mdThemingProvider.theme('teal').primaryPalette('teal');
    $mdThemingProvider.theme('brown').primaryPalette('brown');
    $mdThemingProvider.theme('indigo').primaryPalette('indigo');

    $mdThemingProvider.alwaysWatchTheme(true);
}])
.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.$on('mapInitialized', function(evt, map) {
    $rootScope.mymap = map;
    $rootScope.$apply();
  });
  
  $state.transitionTo('home'); 
}]);