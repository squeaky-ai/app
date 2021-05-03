# frozen_string_literal: true

module Mutations
  class AuthenticatedMutation < BaseMutation
    def ready?(_args)
      raise Errors::Unauthorized unless context[:current_user]

      true
    end
  end
end
