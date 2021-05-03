# frozen_string_literal: true

module Mutations
  class TeamInvite < AuthenticatedMutation
    null false

    argument :id, ID, required: true
    argument :email, String, required: true
    argument :role, Integer, required: true

    type Types::SiteType

    def resolve(id:, email:, role:)
      user = context[:current_user]
      site = user.sites.find { |s| s.id == id.to_i }

      raise Errors::SiteNotFound unless site
      raise Errors::SiteForbidden unless user.admin_for?(site)
      raise Errors::TeamRoleInvalid unless [0, 1].include?(role)

      invited_user = User.find_or_create_by(email: email) do |u|
        # Allows us to tell which users were invited and which
        # signed up on their own
        u.invited_at = Time.now
      end

      # Invite the user with a pending status unless they are
      # already a team member
      unless invited_user.member_of?(site)
        Team.create({ status: 1, role: role, user: invited_user, site: site })
      end

      token = JsonWebToken.encode({ email: email, id: site.id }, 1.day.from_now)
      TeamMailer.invite(email, site, user, token).deliver_now

      site.reload
    end
  end
end
