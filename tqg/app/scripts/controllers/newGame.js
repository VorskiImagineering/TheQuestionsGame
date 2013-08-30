'use strict';

var NewGameCtrl = angular.module('tqgApp')
  .controller('NewGameCtrl', function ($scope, $routeParams, $location, User, Game) {
    $scope.gameId = $routeParams.gid;
    $scope.user = User;
    $scope.game = Game;

    $scope.game.getGame($scope.gameId);

    $scope.game.newGame.gameId = $scope.gameId;
  });

NewGameCtrl.$inject = ['$scope', '$routeParams', '$location', 'User', 'Game'];