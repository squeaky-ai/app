# frozen_string_literal: true

require 'uri'
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

  def self.format_uri(url)
    uri = URI(url)
    return nil unless uri.scheme && uri.host

    "#{uri.scheme}://#{uri.host.downcase}"
  end
end
