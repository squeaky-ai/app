# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :auth_request, mutation: Mutations::AuthRequest
    field :auth_verify, mutation: Mutations::AuthVerify
    field :user_update, mutation: Mutations::UserUpdate
  end
end
