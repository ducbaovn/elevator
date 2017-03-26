/**
 * @ngdoc service
 * @name elevatorApp.service:Elevator
 * @description
 * This is Elevator Class:
 * Properties: id, runSpeed, stopTime, capacity, people, level, status, timer, bookingQueue
 *
*/
(function() {
  'use strict';
  var RUN_TIMEOUT = 1000;
  var STOP_TIMEOUT = 5000;
  angular.module('elevatorApp')
    .factory('Elevator', elevatorModel);

  elevatorModel.$inject = ["$timeout", "elevatorLog"];

  function elevatorModel($timeout, elevatorLog) {
    function Elevator(id, runSpeed, stopTime, capacity, people, level, status) {
      if (!people) {
        people = 0
      }
      if (!level) {
        level = 1
      }
      if (!status) {
        status = 0
      }
      if (!runSpeed) {
        runSpeed = RUN_TIMEOUT
      }
      if (!stopTime) {
        stopTime = STOP_TIMEOUT
      }
      this.id = id;
      this.runSpeed = runSpeed;
      this.stopTime = stopTime;
      this.capacity = capacity;
      this.people = people;
      this.level = level;
      this.status = status;
      this.timer = null;
      this.bookingQueue = [];
    }

    /**
     * @ngdoc method
     * @name symbol
     * @methodOf elevatorApp.service:Elevator
     * @description
     * This method is used for displaying elevator (people in there, direction)
     * @param {object} floor floor object
     * @returns {string} symbol. Ex: 9^, 5\/...
    */
    Elevator.prototype.symbol = function (floor) {
      var self = this;
      var queue = self.bookingQueue[0];
      if (self.level == floor.level) {
        if (!queue) return '-'
        var t = (queue.direction == 1)? '^':'\\/'
        return self.people + t;
      }
      return ''
    }

    /**
     * @ngdoc method
     * @name run
     * @methodOf elevatorApp.service:Elevator
     * @description
     * This method is used for simulating elevator run
    */
    Elevator.prototype.run = function() {
      var self = this
      var queue = self.bookingQueue[0]
      if (!queue) return;
      self.status = 1;
      if (self.timer) {
        $timeout.cancel(self.timer);
      }
      self.timer = $timeout(running, self.runSpeed)
      function running() {
        if (queue.direction == 1) {
          self.level++
        } else {
          self.level--
        }
        process();
      }
      function process() {
        var queue = self.bookingQueue[0]
        if (queue.floor.level == self.level) {
          self.stop()
        } else {
          self.run()
        }
      }
    }

    /**
     * @ngdoc method
     * @name stop
     * @methodOf elevatorApp.service:Elevator
     * @description
     * This method is used for simulating elevator stop
    */
    Elevator.prototype.stop = function() {
      var self = this;
      var queue = self.bookingQueue.shift();
      queue.floor.isBooking = false;
      var exactPeople = queue.floor.people;
      if (exactPeople > (self.capacity - self.people)) exactPeople = (self.capacity - self.people)
      if (self.timer) {
        $timeout.cancel(self.timer);
      }
      self.people -= queue.people;
      self.status = 0;

      function process() {
        var queue = self.bookingQueue[0]
        if (queue && (queue.floor.level == self.level)) {
          self.stop()
        } else {
          self.run()
        }
      }

      function log(info) {console.log(info)}

      if (queue.direction == queue.floor.direction()) {
        self.people += exactPeople
        queue.floor.people -= exactPeople
        elevatorLog.push(self).then(log, log)
        self.isBooked(queue.floor.toFloor, queue.direction, exactPeople, self.stopTime)
        queue.floor.toFloor = null;
      } else {
        elevatorLog.push(self).then(log, log)
        self.timer = $timeout(process, self.stopTime);
      }
    }

    /**
     * @ngdoc method
     * @name addToQueue
     * @methodOf elevatorApp.service:Elevator
     * @description
     * This method is used for adding an order to elevator booking queue
     * @param {object} floor floor object
     * @param {integer=} direction the order direction
     * @param {integer=} people people who leave the elevator after the order be finished
     * @returns {integer} the position of this order in the queue (0...queueLength-1)
    */
    Elevator.prototype.addToQueue = function(floor, direction, people) {
      var self = this;
      var i = 0;
      var isDuplicate = false;
      if (!people) {
        people = 0;
      }
      for (i = 0; i < self.bookingQueue.length; i++) {
        if (!direction) {
          if ((self.bookingQueue[i].floor.level * self.bookingQueue[i].direction >= floor.level * floor.direction()) && (self.bookingQueue[i].direction == floor.direction())) {
            if (self.bookingQueue[i].floor.level == floor.level) {
              self.bookingQueue[i].people += people;
              var isDuplicate = true;
            }
            break;
          }
        } else {
          if ((self.bookingQueue[i].floor.level * self.bookingQueue[i].direction >= floor.level * floor.direction()) && (self.bookingQueue[i].direction == floor.direction())) {
            if (self.bookingQueue[i].floor.level == floor.level) {
              self.bookingQueue[i].people += people;
              var isDuplicate = true;
            }
            break;
          } else if (self.bookingQueue[i].direction != floor.direction()) {
            break;
          }
        }
      }
      if (!isDuplicate) {
        self.bookingQueue.splice(i, 0, {
          floor: floor,
          direction: (direction || floor.direction()),
          people: people
        })
      }
      return i
    }

    /**
     * @ngdoc method
     * @name isBooked
     * @methodOf elevatorApp.service:Elevator
     * @description
     * This method is called by the floor which book this elevator
     * @param {object} floor floor object
     * @param {integer=} direction the order direction
     * @param {integer=} people people who leave the elevator after the order be finished
     * @param {integer=} timeout simulated time
    */
    Elevator.prototype.isBooked = function (floor, direction, people, timeout) {
      var self = this;
      if (!timeout) {
        timeout = 0;
      }
      if (self.addToQueue(floor, direction, people) == 0) {
        self.timer = $timeout(process, timeout);
      }
      function process() {
        var queue = self.bookingQueue[0]
        if (queue.floor.level == self.level) {
          self.stop()
        } else {
          self.run()
        }
      }
    }

    return Elevator;
  }
})();