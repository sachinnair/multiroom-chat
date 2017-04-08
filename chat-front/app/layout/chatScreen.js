/*'use strict';*/

angular.module('myApp.chat', ['ngRoute', 'angularCSS'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/chat', {
      templateUrl: 'layout/chat-screen.html',
      controller: 'chatController',
      css: 'layout/chat-screen.css'
    });
  }])

  .controller('chatController', ['$scope', '$anchorScroll', function ($scope, $anchorScroll) {

    $scope.rooms = [];

    var messages = [];

    $scope.messages = messages;

    var socket = io("/rooms");

    $scope.currentRoom = $scope.rooms[0];

    socket.on("init messages", function (storedMessages) {
      console.log("init messages received", storedMessages, storedMessages.messages);
      messages = storedMessages.messages.concat(messages);
      $scope.rooms = storedMessages.rooms;
      if(!$scope.currentRoom){
        $scope.currentRoom = $scope.rooms[0];
      }
      $scope.messages = messages;
      $scope.username = storedMessages.username;
      $scope.$apply('messages', 'rooms');
    });

    socket.on("message broadcast", function (message) {
      console.log("Message broadcasted", $scope.messages);
      messages.push(message);
      $scope.messages = messages;
      $scope.$apply();
    })

    socket.on("new room notify", function (roomName) {
      $scope.rooms.push(roomName);
      $scope.$apply();
    })
    
    $scope.createRoom = function () {
      $scope.messages = messages = [];
      var newRoom = "Room" + $scope.rooms.length;
      $scope.currentRoom = newRoom;
      socket.emit('create room', newRoom);
    }

    $scope.sendMessage = function () {
      var message = $scope.msgSpace;
      socket.emit('chat message', message);
      $scope.msgSpace = "";
      $anchorScroll('lastmessage');
    }

    $scope.switchRoom = function(toRoom){
      messages = [];
      $scope.currentRoom = toRoom;
      socket.emit("switch room", toRoom);
    }
   
  }]);