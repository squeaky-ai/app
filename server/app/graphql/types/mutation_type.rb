# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    # Auth
    field :auth_request,
          mutation: Mutations::AuthRequest,
          description: 'Requst an auth token to be sent to the provided email'
    field :auth_verify,
          mutation: Mutations::AuthVerify,
          description: 'Verify that the auth token matches the one stored'

    # Users
    field :user_update,
          mutation: Mutations::UserUpdate,
          description: 'Update a users details'

    # Sites
    field :site_create,
          mutation: Mutations::SiteCreate,
          description: 'Create a new, unverified site'
    field :site_verify,
          mutation: Mutations::SiteVerify,
          description: 'Verify that the site has the script installed correctly'
  end
end
