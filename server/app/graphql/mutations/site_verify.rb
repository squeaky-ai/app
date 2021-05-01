# frozen_string_literal: true

require 'uri'
require 'net/http'

module Mutations
  class SiteVerify < Mutations::BaseMutation
    null false

    argument :id, ID, required: true

    type Types::SiteType

    def resolve(id:)
      user = context[:current_user]
      site = user.sites.find { |s| s.id == id.to_i }

      raise Errors::SiteNotFound unless site

      raise Errors::SiteForbidden unless user.admin_for?(site)

      # The user may want to validate more than once
      # so we store a timestamp rather than a boolean
      site.update({ verified_at: Time.now }) if script_tag_exists?(site)

      site
    end

    def ready?(_args)
      raise Errors::Unauthorized unless context[:current_user]

      true
    end

    private

    def script_tag_exists?(site)
      uri = URI(site.url)
      res = Net::HTTP.get(uri, { 'User-Agent': 'Squeaky.ai verification check' })

      res.include?(site.uuid)
    end
  end
end
