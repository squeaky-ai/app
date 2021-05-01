# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'hello@squeaky.ai'
  layout 'mailer'
end
