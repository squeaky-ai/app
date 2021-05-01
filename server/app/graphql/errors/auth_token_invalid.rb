# frozen_string_literal: true

module Errors
  class AuthTokenInvalid < GraphQL::ExecutionError
    def initialize(msg = 'Token is incorrect or has expired')
      super
    end
  end
end
