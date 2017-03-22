(function() {
  'use strict';
  angular.module('elevatorApp')
    .factory('Floor', floorModel);

  floorModel.$inject = [];

  function floorModel() {
    function Floor(level, toFloor, people) {
      if (!people) {
        people = 0
      }
      this.level = level;
      this.people = people;
      this.toFloor = toFloor;
      this.direction = (!this.toFloor || (this.toFloor.level == this.level))? 0: (this.toFloor.level > this.level)? 1: -1;
      this.buttonCss = 'btn btn-default';
    }
    Floor.prototype.book = function(totalFloor, elevators) {
      var self = this;
      var target = 0;
      var k = 0;
      function nearestCarAlgorithmValue(floor, totalFloor, elevator) {
        if (floor.direction == 1) {
          if (elevator.level > floor.level) return 1;
          if (elevator.direction == floor.direction) return (totalFloor + 1) - (floor.level - elevator.level);
          return totalFloor - (floor.level - elevator.level)
        }
        if (elevator.level < floor.level) return 1;
        if (elevator.direction == floor.direction) return (totalFloor + 1) - (elevator.level - floor.level);
        return totalFloor - (elevator.level - floor.level);
      }
      for (var i = 0; i < elevators.total; i++) {
        if (nearestCarAlgorithmValue(self, totalFloor, elevators.data[i]) > k) {
          k = nearestCarAlgorithmValue(self, totalFloor, elevators.data[i]);
          target = i;
        }
      }
      self.buttonCss = 'btn btn-default disabled';
      elevators.data[target].isBooked(self)
    }

    return Floor;
  }
})()