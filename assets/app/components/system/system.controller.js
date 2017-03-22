(function () {
  'use strict';

  angular.module('elevatorApp')
    .controller('systemController', systemController);

  systemController.$inject = ["$scope", "systemService"];

  function systemController($scope, systemService) {
    $scope.system = {
      floors: {
        total: 10,
        data: []
      },
      elevators: {
        total: 5,
        data: []
      }
    }
    systemService.init($scope.system);
    $scope.otherFloor = systemService.getOtherFloor;
    $scope.getFloor = systemService.getFloor;
    $scope.changeDirection = function (floor) {
      floor.direction = (!floor.toFloor || (floor.toFloor.level == floor.level))? 0: (floor.toFloor.level > floor.level)? 1: -1;
      console.log(floor.toFloor.level, floor.level)
    }
  }
})();