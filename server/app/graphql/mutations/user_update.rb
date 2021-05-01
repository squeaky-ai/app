# frozen_string_literal: true

module Mutations
  class UserUpdate < Mutations::BaseMutation
    null false

    argument :first_name, String, required: false
    argument :last_name, String, required: false
    argument :email, String, required: false

    type Types::UserType

    def resolve(**args)
      user = context[:current_user]
      user.update(args)
      user
    end

    def ready?(_args)
      raise GraphQL::ExecutionError, 'Unauthorized' unless context[:current_user]

      true
    end
  end
end
