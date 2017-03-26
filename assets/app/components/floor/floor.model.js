/**
 * @ngdoc service
 * @name elevatorApp.service:Floor
 * @description
 * This is Floor Class:
 * Properties: level, people, toFloor, isBooking
*/
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
      this.isBooking = false;
    }

    /**
     * @ngdoc method
     * @name direction
     * @methodOf elevatorApp.service:Floor
     * @description
     * This method return direction of floor order
     * @returns {integer} -1|0|1: down|landing|up
    */
    Floor.prototype.direction = function() {
      return (!this.toFloor || (this.toFloor.level == this.level))? 0: (this.toFloor.level > this.level)? 1: -1;
    }

    /**
     * @ngdoc method
     * @name buttonCss
     * @methodOf elevatorApp.service:Floor
     * @description
     * This method control button visible/invisible
     * @returns {string} 'btn btn-default disabled'|'btn btn-default'
    */
    Floor.prototype.buttonCss = function() {
      return ((this.people <= 0) || !this.toFloor || this.isBooking)? 'btn btn-default disabled': 'btn btn-default';
    }

    /**
     * @ngdoc method
     * @name book
     * @methodOf elevatorApp.service:Floor
     * @description
     * This method for booking elevator use most basic solution: Nearest Car Algorithm (NCA) with Capacity Considerations. I improve the NCA in <a href="https://books.google.com.vn/books?id=OOBzCgAAQBAJ&pg=PA273&dq=nearest+car+algorithm&hl=vi&sa=X&ved=0ahUKEwjW-KGdnfPSAhUBi5QKHSafC_UQ6AEIGTAA#v=onepage&q=nearest%20car%20algorithm&f=false"><i>Elevator Traffic Handbook:Theory and Practice</i></a> by include capacity effect
    */
    Floor.prototype.book = function(totalFloor, elevators) {
      var self = this;
      var target = 0;
      var k = 0;
      function nearestCarAlgorithmValue(floor, totalFloor, elevator) {
        var remainingCapacity = elevator.capacity - elevator.people;
        if (!remainingCapacity) return 0;
        if (floor.direction() == 1) {
          if (elevator.level > floor.level) return 1 + remainingCapacity;
          if (elevator.direction == floor.direction()) return (totalFloor + 1) - (floor.level - elevator.level) + remainingCapacity;
          return totalFloor - (floor.level - elevator.level) + remainingCapacity
        }
        if (elevator.level < floor.level) return 1 + remainingCapacity;
        if (elevator.direction == floor.direction()) return (totalFloor + 1) - (elevator.level - floor.level) + remainingCapacity;
        return totalFloor - (elevator.level - floor.level) + remainingCapacity;
      }
      for (var i = 0; i < elevators.total; i++) {
        if (nearestCarAlgorithmValue(self, totalFloor, elevators.data[i]) > k) {
          k = nearestCarAlgorithmValue(self, totalFloor, elevators.data[i]);
          target = i;
        }
      }
      self.isBooking = true;
      elevators.data[target].isBooked(self)
    }

    return Floor;
  }
})();