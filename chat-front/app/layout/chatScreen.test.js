'use strict';

describe('myApp.chat module', function() {

  beforeEach(module('myApp.chat'));

  describe('chat controller', function(){

    it('should....', inject(function($controller, $rootScope, $anchorScroll) {
      //spec body
      var chatCtrl = $controller('chatController', {$scope: $rootScope.$new()});
      expect(chatCtrl).toBeDefined();
    }));
  });
});