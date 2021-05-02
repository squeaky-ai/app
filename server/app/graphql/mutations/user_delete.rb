# frozen_string_literal: true

module Mutations
  class UserDelete < Mutations::BaseMutation
    null true

    type Types::UserType

    def resolve
      user = context[:current_user]
      user.destroy
      nil
    end

    def ready?(_args)
      raise Errors::Unauthorized unless context[:current_user]

      true
    end
  end
end
