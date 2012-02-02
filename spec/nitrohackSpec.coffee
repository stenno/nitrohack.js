vows = require 'vows'
assert = require 'assert'
NitroHack = require '../index'

exports.interface = vows.describe('Interface')
  .addBatch
    'Class Level':
      topic: ->
        return NitroHack
      'should be callable': (hack) ->
        assert.isFunction hack
      'when initialized':
        topic: (hack) ->
          return new hack
        'should use localhost by default': (instance) ->
          assert.equal instance.host, "localhost"
        'should use default nitrohack port': (instance) ->
          assert.equal instance.port, 7115


exports.authentication = vows.describe('Authenticating with the Server')
  .addBatch
    'when supplying valid credentials':
      topic: ->
        # initialize a new client
        # connecting with valid credentials
        nitro = new NitroHack(ip, port)
        nitro.auth(user, pass, reconnect)


        return false
      'we should be connected': (success) ->
        assert.isTrue success

exports.startingGame = vows.describe('Starting a new Game')
  .addBatch
    'when authenticated':
      topic: ->
        nitro.start_game(name, other_params)

exports.answeringQuestion = vows.describe('Answering a Question')
  .addBatch
    'when the game has started':
      topic: ->
        nitro.bind("yn", yn_handler)
