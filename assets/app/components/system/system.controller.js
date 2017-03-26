/**
 * @ngdoc controller
 * @name elevatorApp.controller:systemController
 *
 * @description
 * Controller for init elevator system and manage input params:
 * people on floors, the floor people wish to go, booking a elevator
 * @example
  <example module="elevatorApp">
    <file name="system.html">
      <div class="row">
        <div class="col-md-4" ui-view="floor"></div>
        <div class="col-md-8" ui-view="elevator"></div>
      </div>
    </file>

    <file name="floor.html">
      <div class="row borderSystem">
        <div class="col-md-2">Level</div>
        <div class="col-md-3">People</div>
        <div class="col-md-4">Level wish to go to</div>
        <div class="col-md-3">Book</div>
      </div>
      <div class="row borderSystem" ng-repeat="(i, floor) in system.floors.data">
        <div class="col-md-2">{{floor.level}}</div>
        <div class="col-md-3">
          <input type="number" class="form-control" id="floorPeopleInput" placeholder="people" ng-model="floor.people">
        </div>
        <div class="col-md-4">
          <select ng-options="f.level for f in _.reject(system.floors.data, floor)" ng-model="floor.toFloor">
          </select>
        </div>
        <div class="col-md-3">
          <button ng-class="floor.buttonCss()" ng-click="floor.book(system.floors.total, system.elevators)">Book</button>
        </div>
      </div>
    </file>

    <file name="elevator.html">
      <div class="row">
        <div ng-class="system.elevatorClass" ng-repeat="(j, elevator) in system.elevators.data">Elevator {{elevator.id}}</div>
      </div>
      <div class="row" ng-repeat="(i, floor) in system.floors.data">
        <div ng-class="system.elevatorClass" ng-repeat="(j, elevator) in system.elevators.data">{{elevator.symbol(floor)}}</div>
      </div>
    </file>
  </example>
*/
(function () {
  'use strict';

  angular.module('elevatorApp')
    .constant('_', window._)
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
    $scope._ = _;
    systemService.init($scope.system);
  }
})();