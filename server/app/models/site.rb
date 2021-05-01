# frozen_string_literal: true

require 'securerandom'

class Site < ApplicationRecord
  validates :url, uniqueness: { message: 'This site is already registered' }

  # Generate a uuid for the site when it's created
  # that will be used publicly
  attribute :uuid, :string, default: -> { SecureRandom.uuid }

  has_many :memberships
  has_many :users, through: :memberships

  def owner_name
    memberships.find(&:owner?).user.full_name
  end

  def admins
    memberships.filter { |m| m.role < 2 }
  end
end
