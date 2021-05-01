# frozen_string_literal: true

require 'uri'

module Mutations
  class SiteCreate < Mutations::BaseMutation
    null false

    argument :name, String, required: true
    argument :url, String, required: true

    type Types::SiteType

    def resolve(name:, url:)
      user = context[:current_user]
      site = Site.create({ name: name, url: uri(url), plan: 0 })

      raise GraphQL::ExecutionError, site.errors.full_messages.first unless site.valid?

      # Set the current user as the admin of the site
      # and skip the confirmation steps
      Membership.create({ status: 0, role: 2, user: user, site: site })
      site
    end

    def ready?(_args)
      raise GraphQL::ExecutionError, 'Unauthorized' unless context[:current_user]

      true
    end

    private

    def uri(url)
      uri = URI(url)
      # This is quite important! The last thing we want 
      # is nil://nil being in there and being unique!
      raise GraphQL::ExecutionError, 'Invalid URI' unless uri.scheme && uri.host

      "#{uri.scheme}://#{uri.host.downcase}"
    end
  end
end
