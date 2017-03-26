###
  @api {post} /v1/elevator/history Push Log
  @apiName Push Log
  @apiVersion 1.0.0
  @apiGroup 1 Elevator

  @apiHeader {string} Accept-Language Accepted Vietnamese - "vi", English - "en". Default: "en"

  @apiParam {string} elevatorId
  @apiParam {integer} people
  @apiParam {integer} level level current level of elevator
  @apiParam {integer} direction -1|0|1: down|stop|up
  @apiParam {integer} status 0|1: idle|running

  @apiSuccess {string} token token for authorization

  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
    {
      "status": "success"
    }
  @apiError code-1000 Error undefined.
  @apiErrorExample Error-Response:
     HTTP/1.1 400 Bad Request
     {
       "code": 1000
       "message": "Error undefined. Try again later"
     }
###
exports.history = (req, res)->
  params = req.allParams()
  ElevatorLog.create
    elevatorId: params.elevatorId
    people: params.people
    level: params.level
    direction: params.direction
    status: params.status
  .then (log)->
    return res.ok {status: 'success'}
  .catch (err)->
    sails.log.error err
    return res.badRequest {code: 1000, message: "Error undefined. Try again later"}
