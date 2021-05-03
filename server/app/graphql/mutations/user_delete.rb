# frozen_string_literal: true

module Mutations
  class UserDelete < AuthenticatedMutation
    null true

    type Types::UserType

    def resolve
      user = context[:current_user]
      user.destroy
      nil
    end
  end
end
