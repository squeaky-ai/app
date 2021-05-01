# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    # Auth
    field :auth_request, mutation: Mutations::AuthRequest
    field :auth_verify, mutation: Mutations::AuthVerify

    # Users
    field :user_update, mutation: Mutations::UserUpdate

    # Sites
    field :site_create, mutation: Mutations::SiteCreate
    field :site_verify, mutation: Mutations::SiteVerify
  end
end
