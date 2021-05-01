# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :user, UserType, null: true do
      description 'Get the user from the Bearer token'
    end

    field :sites, [SiteType], null: false do
      description 'Get a list of sites for the user'
    end

    def user
      context[:current_user]
    end

    def sites
      context[:current_user].sites
    end
  end
end
