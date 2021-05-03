# frozen_string_literal: true

module Mutations
  class TeamInviteResend < AuthenticatedMutation
    null false

    argument :id, ID, required: true
    argument :team_id, Integer, required: true

    type Types::SiteType

    def resolve(id:, team_id:)
      user = context[:current_user]
      site = user.sites.find { |s| s.id == id.to_i }

      raise Errors::SiteNotFound unless site
      raise Errors::SiteForbidden unless user.admin_for?(site)

      member = site.team.find { |t| t.id == team_id.to_i }

      if member.pending?
        token = JsonWebToken.encode({ email: member.user.email, id: site.id }, 1.day.from_now)
        TeamMailer.invite(email, site, user, token).deliver_now
      end

      site
    end
  end
end
