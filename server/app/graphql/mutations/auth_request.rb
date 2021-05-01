# frozen_string_literal: true

require 'date'

class Mutations::AuthRequest < Mutations::BaseMutation
  null false

  argument :email, String, required: true
  argument :auth_type, Types::AuthType, required: true

  field :email_sent_at, String, null: true
  field :validation_message, String, null: true

  def resolve(email:, auth_type:)
    user = User.find_by(email: email)

    return { validation_message: 'User already has an account' } if user && auth_type == 'SIGNUP'

    return { validation_message: 'User does not have an account' } if !user && auth_type == 'LOGIN'

    one_time_password = OneTimePassword.new(email).create!
    send_mail!(auth_type, email, one_time_password)

    {
      email_sent_at: DateTime.now.iso8601,
      validation_message: nil
    }
  end

  private

  def send_mail!(auth_type, email, token)
    if auth_type == 'SIGNUP'
      AuthTokenMailer.login(email, token).deliver_now
    else
      AuthTokenMailer.signup(email, token).deliver_now
    end
  end
end
