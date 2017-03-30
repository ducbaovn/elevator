/**
 * @ngdoc service
 * @name elevatorApp.service:elevatorLog
 * @description
 * This is a service to push log for tracking the movement of the elevators in backend data storage
 *
*/
(function() {
  'use strict';
  var PUSH_LOG = "http://localhost:1337/api/v1/elevator/history";
  angular.module('elevatorApp')
    .factory('elevatorLog', elevatorLog);

  elevatorLog.$inject = ["$http"];

  function elevatorLog($http) {

    /**
     * @ngdoc method
     * @name push
     * @methodOf elevatorApp.service:elevatorLog
     * @description
     * This method is used for tracking the movement of the elevators in backend data storage
     * @param {object} elevator elevator object
     * @returns {httpPromise} resolve with fetched data, or fails with error description.
    */
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
})();