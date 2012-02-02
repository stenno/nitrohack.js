vows = require 'vows'
assert = require 'assert'

vows.describe('Authenticating with the Server')
  .addBatch
    'when supplying valid credentials':
      topic: ->
        # initialize a new client
        # connecting with valid credentials
        return false
      'we should be connected': (success) ->
        assert.isTrue success

.export(module)