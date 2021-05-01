# frozen_string_literal: true

class Membership < ApplicationRecord
  belongs_to :site
  belongs_to :user

  def owner?
    role.zero?
  end
end
