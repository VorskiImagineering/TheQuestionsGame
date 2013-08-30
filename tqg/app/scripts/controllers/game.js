'use strict';

var GameCtrl = angular.module('tqgApp')
  .controller('GameCtrl', function ($scope, $routeParams, $location, User, Game) {
    $scope.gameId = $routeParams.gid;
    $scope.user = User;
    $scope.game = Game;

    Game.getGame($scope.gameId);
  });

GameCtrl.$inject = ['$scope', '$routeParams', '$location', 'User', 'Game'];
