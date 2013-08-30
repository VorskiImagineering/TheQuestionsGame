'use strict';

var login = angular.module('tqgApp')
  .directive('login', function (User) {
    return {
      template: '<button>Login with Facebook</button>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.bind('click', function () {
          User.logIn();
        });
      }
    };
  });

login.$inject = ['User'];