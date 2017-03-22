var PUSH_LOG = "http://localhost:1337/v1/elevator/history";
(function() {
  'use strict';
  angular.module('elevatorApp')
    .factory('elevatorLog', elevatorLog);

  elevatorLog.$inject = ["$http"];

  function elevatorLog($http) {
    var doRequest = function(elevator) {
      var queue = elevator.bookingQueue[0]
      var data = {
        elevatorId: elevator.id,
        people: elevator.people,
        level: elevator.level,
        direction: queue? queue.direction: 0,
        status: elevator.status
      }
      return $http.post(PUSH_LOG, data);
    }
    return {
      push: doRequest
    }
  }
})()