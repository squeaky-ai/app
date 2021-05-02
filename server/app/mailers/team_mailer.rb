# frozen_string_literal: true

class TeamMailer < ApplicationMailer
  def invite(email, site, inviter, token)
    @site = site
    @inviter = inviter
    @token = token
    # TODO: Configure the url with the token in it
    mail(to: email, subject: 'You’ve been invited to join Squeaky')
  end
end
