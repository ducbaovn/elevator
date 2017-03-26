/**
 * @ngdoc service
 * @name elevatorApp.service:systemService
 *
 * @description
 * This is a service to init system.
 *
*/
(function () {
  'use strict';

  angular.module('elevatorApp')
    .factory('systemService', systemService);

  systemService.$inject = ["Floor","Elevator"];

  function systemService(Floor, Elevator) {
    var totalFloor = 10;
    var totalElevator = 4;
    var elevatorCapacity = 20;
    var runSpeed = 1000;
    var stopTime = 5000;

    /**
     * @ngdoc method
     * @name set
     * @methodOf elevatorApp.service:systemService
     * @description
     * This method will set parameters for init system
     * @param {integer} floorNumber total Floors
     * @param {integer} elevatorNumber total Eloors
     * @param {integer} capacity Elevator Capacity
     * @param {integer} speed elevator speed (second per floor)
     * @param {integer} stop how long elevator stop (in second)
    */
    var setParams = function (floorNumber, elevatorNumber, capacity, speed, stop) {
      totalFloor = floorNumber;
      totalElevator = elevatorNumber;
      elevatorCapacity = capacity;
      runSpeed = speed * 1000;
      stopTime = stop * 1000;
    }

    /**
     * @ngdoc method
     * @name init
     * @methodOf elevatorApp.service:systemService
     * @description
     * This method will init elevator system (floor and elevator instances)
     * @param {Object} system system object
    */
    var init = function(system) {
      system.floors.total = totalFloor;
      for(var i = totalFloor; i > 0; i--) {
        system.floors.data.push(new Floor(i))
      }
      system.elevators.total = totalElevator;
      switch (totalElevator) {
        case 1:
          system.elevatorClass = "col-md-12 borderSystem"
        case 2:
          system.elevatorClass = "col-md-6 borderSystem"
        case 3:
          system.elevatorClass = "col-md-4 borderSystem"
        case 4:
          system.elevatorClass = "col-md-3 borderSystem"
        case 5:
          system.elevatorClass = "col-md-2 borderSystem"
        case 6:
          system.elevatorClass = "col-md-2 borderSystem"
      }
      for(var i = 0; i < totalElevator; i++) {
        system.elevators.data.push(new Elevator(i+1, runSpeed, stopTime, elevatorCapacity))
      }
    }

    return {
      init: init,
      set: setParams
    }
  }
})();