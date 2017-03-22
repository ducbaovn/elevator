(function () {
  'use strict';

  angular.module('elevatorApp')
    .controller('installController', installController);

  installController.$inject = ["$scope", "systemService"];

  function installController($scope, systemService) {
    $scope.totalFloor = 10;
    $scope.totalElevator = 4;
    $scope.runSpeed = 1;
    $scope.stopTime = 5;
    $scope.elevatorsOption = [1,2,3,4,5,6];
    $scope.buttonClass = function () {
      if (($scope.totalFloor <= 0) || ($scope.totalElevator <= 0) || ($scope.runSpeed <= 0) || ($scope.stopTime <= 0)) return "btn btn-default disabled"
      return "btn btn-default"
    }
    $scope.init = function() {
      systemService.set($scope.totalFloor, $scope.totalElevator, $scope.runSpeed, $scope.stopTime);
    }
  }
})();