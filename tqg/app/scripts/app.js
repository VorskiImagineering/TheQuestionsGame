'use strict';

angular.module('tqgApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:qs', {
        templateUrl: 'views/anon.html',
        controller: 'AnonCtrl'
      })
      .when('/game/:gid', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .when('/new/:gid', {
        templateUrl: 'views/gameCreate.html',
        controller: 'NewGameCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

/**
 * Initializa Parse.com app
 */
Parse.initialize('Ek7zH223q2oVU53Hcq71x6ZBusHR4mrSyFbOIwli', 'PLHaBNxLzNHSqHdyeqDrohQPNsppckv8mrPXlnVa');


/**
 * Initializa Facebook API
 */
window.fbAsyncInit = function () {
  console.log('init');
  Parse.FacebookUtils.init({
    appId: '148740492001273',
    channelUrl: '//thequestionsgame.parseapp.com/channel.html',
    cookie: true,
    xfbml: true,
    status: true
  });
};