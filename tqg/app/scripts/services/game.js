'use strict';

var Game = angular.module('tqgApp')
  .service('Game', function Game($location, $rootScope) {

    var self = this;

    this.currentGame = null;
    this.currentPlayers = [];

    this.rolesChoices = [
      {
        id: 0,
        name: 'one question'
      }
    ];

    this.questionsSets = [];
    this.questionsChoices = [];

    this.newGame = {
      gameGod: Parse.User.current(),
      gameId: null,
      rule: 0,
      questionsSet: 0
    };

    this.getGame = function (gameId) {
      var query = new Parse.Query('Game');
      query.equalTo('gameId', gameId);
      query.find({
        success: function (games) {
          console.log('got games');
          console.log(games);
          if (games.length === 0) {
            $rootScope.$apply(function () {
              $location.path('/new/' + gameId);
            });
          } else {
            $rootScope.$apply(function () {
              self.currentGame = games[0];
              games[0].relation('players').add(Parse.User.current());
              games[0].save();
            });
            games[0].relation('players').query()
              .notEqualTo('objectId', Parse.User.current().id)
              .find({
              success: function (players) {
                console.log('got game players');
                console.log(players);
                $rootScope.$apply(function () {
                  console.log(players);
                  self.currentPlayers = players;
                });
              },
              error: function (error) {
                console.error(error);
              }
            });
          }
        },
        error: function () {
          console.log('create new game');
        }
      });
    };

    this.saveGame = function (gameObj) {
      var Game = new Parse.Object.extend('Game'),
        game = new Game();

      if (gameObj === undefined) {
        gameObj = self.newGame;
      }

      game.save(gameObj, {
        success: function (newGame) {
          console.log('created game');
          console.log(newGame);
          console.log(newGame.get('gameId'));
          $rootScope.$apply(function () {
            $location.path('/' + newGame.get('gameId'));
          });
          newGame.relation('players').add(Parse.User.current());
          newGame.save();
        },
        error: function (error) {
          console.log(error);
        }
      })
    };

    var qsquery = new Parse.Query('QuestionsSet');
    qsquery.find({
      success: function (questionsSets) {
        console.log('fetched questions sets');
        console.log(questionsSets);
        $rootScope.$apply(function () {
          self.questionsSets = questionsSets;
          questionsSets.forEach(function (qs) {
            self.questionsChoices.push({id: qs.id, name: qs.get('name')});
          });
        });
      },
      error: function (error) {
        console.error(error);
      }
    })

  });

Game.$inject = ['$location'];
