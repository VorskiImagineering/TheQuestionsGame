
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});


Parse.Cloud.afterSave("Game", function (request) {
  var game = request.object;


  if (request.object.existed()) {
    console.log('its not new game, returning');
    return;
  }

  console.log('creating hat');

  var Hat = Parse.Object.extend('GameHat'),
    hat = new Hat(),
    qsquery = new Parse.Query('QuestionsSet');

  qsquery.get(game.get('questionsSet').id, {
    success: function (qs) {
      console.log('got qs for creating hat');
      qs.relation('questions').query().find({
        success: function (questions) {
          console.log(questions);
          console.log('got questions for creating hat');
          hat.set('game', game);
          if (questions.length !== 0) {
            hat.set('questions', questions);
          }
          hat.save(null, {
            success: function(newHat) {
              console.log('New GameHat created with objectId: ' + newHat.id);
            },
            error: function(error) {
              console.log(error);
            }
          });
        },
        error: function (error) {
          console.log(error);
        }
      });
    },
    error: function (error) {
      console.log(error);
    }
  });
});


Parse.Cloud.define("getQuestion", function (request, response) {
  var userId = request.params.userId,
    gameId = request.params.gameId,
    userquery = new Parse.Query('_User');

  userquery.get(userId, {
    success: function (user) {
      var gamequery = new Parse.Query('Game');
      gamequery.get(gameId, {
        success: function (game) {
          // first check if user already has question...
          console.log('check if user has question');
          var query = new Parse.Query('OneQuestion');
          query.equalTo('user', user);
          query.equalTo('game', game);
          query.first({
            success: function (oneQuestion) {
              if (oneQuestion !== undefined) {
                // yes, he has
                console.log('user already had question, returning...');
                var questionquery = new Parse.Query('Question');
                questionquery.get(oneQuestion.get('question').id, {
                  success: function (question) {
                    response.success(question);
                  }
                });
              } else {
                // no question found, create one from hat
                var hatquery = new Parse.Query('GameHat');
                hatquery.equalTo('game', game);
                hatquery.first({
                  success: function (hat) {
                    console.log('getting game hat');
                    hat.relation('questions').query().find({
                      success: function (questions) {
                        var OneQuestion = Parse.Object.extend('OneQuestion'),
                          onequestion = new OneQuestion();
                        onequestion.set('game', game);
                        onequestion.set('user', user);
                        if (questions.length !== 0) {
                          // pick random question from hat
                          console.log('picking random question from hat');
                          var q = questions[Math.floor(Math.random() * questions.length)];
                          hat.relation('questions').remove(q);
                          hat.save();
                          onequestion.set('question', q);
                          onequestion.save();
                          response.success(q);
                        } else {
                          // hat is empty, refill!!
                          console.log('hat is empty, refilling...');
                          var qsquery = new Parse.Query('QuestionsSet');
                          qsquery.get(game.get('questionsSet'), {
                            success: function (qs) {
                              qs.relation('questions').query().find({
                                success: function (pureQuestions) {
                                  console.log('got questions from QS');
                                  console.log(pureQuestions);
                                  var randidx = Math.floor(Math.random() * pureQuestions.length),
                                    q = pureQuestions[randidx];
                                  pureQuestions.splice(randidx, 1);
                                  hat.relation('questions').add(pureQuestions);
                                  hat.save();
                                  console.log(q);
                                  onequestion.set('question', q);
                                  onequestion.save();
                                  response.success(q);
                                }
                              });
                            }
                          });

                        }
                      }
                    })
                  }
                })
              }
            }
          })
        }
      });
    }
  });
});