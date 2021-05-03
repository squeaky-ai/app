# frozen_string_literal: true

module Mutations
  class SiteMutation < BaseMutation
    def ready?(args)
      @user = context[:current_user]
      @site = user.sites.find { |s| s.id == args[:id].to_i }

      raise Errors::Unauthorized unless @user
      raise Errors::SiteNotFound unless @site
      raise Errors::SiteForbidden unless @user.admin_for?(@site)

      true
    end
  end
end
