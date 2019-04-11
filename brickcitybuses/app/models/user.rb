class User < ApplicationRecord
  has_secure_password
  has_many :buses, dependent: :destroy
# from auth_dragon rails-auth in class lab by Drake Talley
  def self.find_from_credentials(email, password)
    user = self.find_by(email: email)
    return nil unless user
    user if user.is_password?(password)
  end

  def is_password?(password_attempt)
    BCrypt::Password.new(password_digest).is_password?(password_attempt)
  end
end
