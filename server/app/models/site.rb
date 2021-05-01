# frozen_string_literal: true

class Site < ApplicationRecord
  validates_uniqueness_of :url

  has_many :memberships
  has_many :users, through: :memberships

  def owner_name
    memberships.find(&:owner?).user.full_name
  end
end
