# frozen_string_literal: true

module Mutations
  class TeamInvite < Mutations::BaseMutation
    null false

    argument :id, ID, required: true
    argument :team_id, String, required: true

    type Types::SiteType

    def resolve(id:, team_id:)
      user = context[:current_user]
      site = user.sites.find { |s| s.id == id.to_i }

      raise Errors::SiteNotFound unless site
      raise Errors::SiteForbidden unless user.admin_for?(site)

      site
    end

    def ready?(_args)
      raise Errors::Unauthorized unless context[:current_user]

      true
    end
  end
end
