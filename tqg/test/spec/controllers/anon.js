'use strict';

describe('Controller: AnonCtrl', function () {

  // load the controller's module
  beforeEach(module('tqgApp'));

  var AnonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnonCtrl = $controller('AnonCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
