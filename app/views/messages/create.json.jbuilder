json.user_name @message.user.name
json.created_date @message.created_at.strftime("%Y-%m-%d %H:%M　")
json.content @message.content
json.image_url @message.id
json.image @message.image
