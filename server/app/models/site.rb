# frozen_string_literal: true

class Site < ApplicationRecord
  validates :url, uniqueness: { message: 'This site is already registered' }

  has_many :memberships
  has_many :users, through: :memberships

  def owner_name
    memberships.find(&:owner?).user.full_name
  end
end
