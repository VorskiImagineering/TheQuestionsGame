'use strict';

var AnonCtrl = angular.module('tqgApp')
  .controller('AnonCtrl', function ($scope, $routeParams) {
    var idx = $routeParams.qs;

    $scope.currentQuestion = '';

    Parse.Cloud.run('getAnonQuestion', {idx: idx}, {
      success: function (question) {
        $scope.$apply(function () {
          $scope.currentQuestion = question;
        });
      }
    });
  });

AnonCtrl.$inject = GameCtrl.$inject = ['$scope', '$routeParams'];
