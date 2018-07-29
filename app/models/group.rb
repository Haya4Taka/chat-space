class Group < ApplicationRecord
  has_many :users, through: :group_users
  has_many :group_users
  has_many :messages
  validates :name, presence: true

  def show_last_message
    if (last_message = messages.last).present?
      if last_message.content?
        last_message.content
      else
        "画像が投稿されています"
      end
    else
      "まだメッセージはありません"
    end
  end

  def members_name
    member_name = []
    self.users.each do |user|
      member_name << user.name
    end
    return member_name.join(", ")
  end
end
