(function () {
  'use strict';

  angular.module('elevatorApp')
    .factory('systemService', systemService);

  systemService.$inject = ["Floor","Elevator"];

  function systemService(Floor, Elevator) {
    var totalFloor = 10;
    var totalElevator = 4;
    var runSpeed = 1000;
    var stopTime = 5000;
    var setParams = function (floorNumber, elevatorNumber, speed, stop) {
      totalFloor = floorNumber;
      totalElevator = elevatorNumber;
      runSpeed = speed * 1000;
      stopTime = stop * 1000;
    }
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
        system.elevators.data.push(new Elevator(i+1, runSpeed, stopTime, system.floors.data, 20))
      }
    }
    var getOtherFloor = function (floors, floor) {
      return _.reject(floors, floor)
    }
    var getFloor = function (floors, floor) {
      return _.filter(floors, floor)[0]
    }
    return {
      init: init,
      set: setParams,
      getOtherFloor: getOtherFloor,
      getFloor: getFloor
    }
  }
})();