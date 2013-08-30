'use strict';

var logout = angular.module('tqgApp')
  .directive('logout', function ($window, User) {
    return {
      template: '<a href="#"><i class="logout-ico"></i><span class="text">Logout</span></a>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.bind('click', function (e) {
          e.preventDefault();
          if ($window.confirm('Are you sure?')) {
            User.logOut();
          }
          return false;
        });
      }
    };
  });

logout.$inject = ['$window', 'User'];