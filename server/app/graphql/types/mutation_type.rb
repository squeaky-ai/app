# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :auth_request, mutation: Mutations::AuthRequest
  end
end
