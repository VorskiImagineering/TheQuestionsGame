'use strict';

var User = angular.module('tqgApp')
  .service('User', function User($route, $rootScope) {
    var self = this;

    this.fbuser = null;
    this.currentUser = Parse.User.current();

    this.fetchFbUserData = function () {
      console.log('fetching user data');

      FB.api('/me', function (response) {
        $rootScope.$apply(function () {
          self.fbuser = response;
          self.username = self.fbuser.name;
          self.refreshParseUser();
        });

        $rootScope.$broadcast('progressBar.update', false);
        console.log('fetched fb user information');
      });
    };
    
    this.refreshParseUser = function () {
      if (self.currentUser.get('name') !== self.fbuser.name || self.currentUser.get('email') !== self.fbuser.email || self.currentUser.get('firstName') !== self.fbuser.first_name) {
        console.log("changing user name from ", self.currentUser.get('name'), " to ", self.fbuser.name);
        console.log("changing e-mail from ", self.currentUser.get('email'), " to ", self.fbuser.email);
        console.log("changing first_name from ", self.currentUser.get('firstName'), " to ", self.fbuser.first_name);
        self.currentUser.set('name', self.fbuser.name);
        self.currentUser.set('firstName', self.fbuser.first_name);
        self.currentUser.set('email', self.fbuser.email);
        self.currentUser.set('facebookid', self.fbuser.id);
        self.currentUser.save();
      } else {
        console.log("user name or e-mail or first_name did not change");
      }
    };

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

    console.log('logged in ' + self.loggedIn());

    if (self.loggedIn()) {
      self.fetchFbUserData();
    }

  });

User.$inject = ['$route', '$rootScope'];