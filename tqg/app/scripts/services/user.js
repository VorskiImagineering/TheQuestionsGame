'use strict';

var User = angular.module('tqgApp')
  .service('User', function User($route) {

    this.logIn = function () {
      Parse.FacebookUtils.logIn('', {
        success: function (user) {
          console.log('logged in');
          console.log(user);
          $route.reload();
        },
        error: function (parseUser, error) {
          console.error('User cancelled the Facebook login or did not fully authorize.');
          console.error(error);
        }
      });
    };

    this.logOut = function () {
      console.log('logout');
      Parse.User.logOut();
      $route.reload();
    };

    this.loggedIn = function () {
      return Parse.User.current() !== null;
    };

  });

User.$inject = ['$route'];