# frozen_string_literal: true

class User < ApplicationRecord
  has_many :memberships
  has_many :sites, through: :memberships

  def full_name
    "#{first_name} #{last_name}".strip
  end
end
