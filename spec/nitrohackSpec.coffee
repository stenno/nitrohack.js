vows = require 'vows'
assert = require 'assert'
NitroHack = require '../index'

exports.initialization = vows.describe('Initializing')
  .addBatch
    'a new Client':
      topic: ->
        return NitroHack
      'should be callable': (hack) ->
        assert.isFunction hack
        

exports.authentication = vows.describe('Authenticating with the Server')
  .addBatch
    'when supplying valid credentials':
      topic: ->
        # initialize a new client
        # connecting with valid credentials
        nitro = new NitroHack(ip, port)
        nitro.auth(user, pass, reconnect)
        nitro.start_game(name, other_params)
        nitro.bind("yn", yn_handler)
        
        
        return false
      'we should be connected': (success) ->
        assert.isTrue success


