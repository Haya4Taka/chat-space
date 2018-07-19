json.array! @messages do |message|
  json.user_name message.user.name
  json.created_date message.created_at.to_s(:default)
  json.content message.content
  json.image_url message.id
  json.image message.image
end
