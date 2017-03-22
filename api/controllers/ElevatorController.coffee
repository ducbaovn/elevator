exports.history = (req, res)->
  params = req.allParams()
  ElevatorLog.create
    elevatorId: params.elevatorId
    people: params.people
    level: params.level
    direction: params.direction
    status: params.status
  .then (log)->
    return res.ok 'ok'
  .catch (err)->
    sails.log.error err
    return res.badRequest {code: 1000, message: err}
