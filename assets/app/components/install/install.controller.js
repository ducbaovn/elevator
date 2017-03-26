/**
 * @ngdoc controller
 * @name elevatorApp.controller:installController
 *
 * @description
 * Controller for setup/config form:
 * totalFloor, totalElevator, elevatorCapacity, runSpeed, stopTime
 * @example
  <example module="elevatorApp">
    <file name="install.html">
      <form class="form-horizontal">
        <div class="form-group">
          <label>Number of floors</label>
          <input type="number" id="numberFloor" placeholder="1" ng-model="totalFloor">
        </div>
        <div class="form-group">
          <label>Number of elevators</label>
          <select ng-options="i for i in elevatorsOption" ng-model="totalElevator"></select>
        </div>
        <div class="form-group">
          <label>Elevators speed (second/floor)</label>
          <input type="number" id="runSpeed" placeholder="1" ng-model="runSpeed">
        </div>
        <div class="form-group">
          <label>Stop time (second)</label>
          <input type="number" id="stopTime" placeholder="1" ng-model="stopTime">
        </div>
        <button type="submit" ng-class="buttonClass()" ng-click="init()" ui-sref="system">Submit</button>
      </form>
    </file>
  </example>
*/

(function () {
  'use strict';

  angular.module('elevatorApp')
    .controller('installController', installController);

  installController.$inject = ["$scope", "systemService"];

  function installController($scope, systemService) {
    $scope.totalFloor = 10;
    $scope.totalElevator = 4;
    $scope.capacity = 20;
    $scope.runSpeed = 1;
    $scope.stopTime = 5;
    $scope.elevatorsOption = [1,2,3,4,5,6];

    /**
     * @ngdoc method
     * @name buttonClass
     * @methodOf elevatorApp.controller:installController
     * @description
     * This method will control abled/disabled button (condition to submit form)
    */
    $scope.buttonClass = function () {
      return (($scope.totalFloor <= 0) || ($scope.totalElevator <= 0) || ($scope.runSpeed <= 0) || ($scope.stopTime <= 0))? "btn btn-default disabled": "btn btn-default"
    }
    $scope.init = function() {
      systemService.set($scope.totalFloor, $scope.totalElevator, $scope.capacity, $scope.runSpeed, $scope.stopTime);
    }
  }
})();