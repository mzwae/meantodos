(function () {
  angular.module('todoApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);
  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }


  angular
    .module('todoApp')
    .config(['$routeProvider', '$locationProvider', config]);

})();