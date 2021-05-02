# frozen_string_literal: true

module Mutations
  class SiteUpdate < Mutations::BaseMutation
    null false

    argument :id, ID, required: true
    argument :name, String, required: false
    argument :url, String, required: false

    type Types::SiteType

    def resolve(id:, name: nil, url: nil)
      user = context[:current_user]
      site = user.sites.find { |s| s.id == id.to_i }

      raise Errors::SiteNotFound unless site
      raise Errors::SiteForbidden unless user.admin_for?(site)

      update = {}
      update[:name] = name if name

      if url
        update[:url] = uri(url)
        # Reset the verification if the url changes as
        # it could be incorrect
        update[:verified_at] = nil
      end

      site.update(update)

      raise GraphQL::ExecutionError, site.errors.full_messages.first unless site.valid?

      site
    end

    def ready?(_args)
      raise Errors::Unauthorized unless context[:current_user]

      true
    end

    private

    def uri(url)
      formatted_uri = Site.format_uri(url)
      # This is quite important! The last thing we want
      # is nil://nil being in there and being unique!
      raise Errors::SiteInvalidUri unless formatted_uri

      formatted_uri
    end
  end
end
