#!/usr/bin/python
# Assume there is a 50 storey building and it has 4 lifts. You have to write a
# scheduler program for the lifts. All the 4 lifts will be controlled by
# single program and Waiting time for peoples waiting for lift should be
# minimum.
#
# Using the Nearest Car approach described at http://www.quora.com/Is-there-any-public-elevator-scheduling-algorithm-standard
#
# Some assumptions include direction of lift at top floor will always be down,
# and on ground floor it will be up. More assumptions obvious from the code.
#
# Author: Kartik Singhal
# Date: October 2, 2012

class Lift():
    def __init__(self, id):
        self.id = id
        self.position = 0           # floor number - {0 .. num_lifts-1}
        self.direction = 1          # current direction - up(+1) or down(-1)
        self.capacity = 20          # max persons allowed
        self.fill_count = 0         # current number of persons

        self.FS = 0                 # figure of suitability

    def __repr__(self):
        return 'Elevator ' + str(self.id)

def assign_lift(request, lifts, N):
    for lift in lifts:
        d = request['pos'] - lift.position          # displacement
        if d / lift.direction >= 0:                 # lift moving towards the call i.e. (d/speed) = +time
            if lift.direction == request['dir']:
                lift.FS = (N + 2) - abs(d)
            else:
                lift.FS = (N + 1) - abs(d)
        else:
            lift.FS = 1

    sorted(lifts, key=lambda lift: lift.FS, reverse=True)
    for lift in lifts:
        if lift.fill_count < lift.capacity:
            return lift

    return None

def main():
    num_floors, num_lifts = [int(x) for x in raw_input().split()]

    lifts = [Lift(i+1) for i in range(num_lifts)]

    for i in range(num_lifts):
        lifts[i].position, lifts[i].direction, lifts[i].fill_count = [int(x) for x in raw_input().split()]

    # request for lift specifies current floor number and direction
    request = {'pos':input(), 'dir':input()}

    print assign_lift(request, lifts, num_floors-1)


if __name__ == '__main__':
    main()

# SAMPLE INPUT
# 50 4
# 4 -1 13
# 50 -1 14
# 22 +1 10
# 0 +1 0
# 14
# 1