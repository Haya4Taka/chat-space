$(function() {
  var search_result = $("#user-search-result");
  var group_member = $("#chat-group-users");

  function showUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id=${ user.id } data-user-name=${ user.name }>追加</a>
                </div>`
    search_result.append(html);
  }

  function appendUser(user) {
    var member_count =$(".js-chat-member").length;
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ member_count +1 }'>
                  <input class="group_members" name='group[user_ids][]' type='hidden' value='${ user.attr('data-user-id') }'>
                  <p class='chat-group-user__name'>${ user.attr('data-user-name') }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    group_member.append(html);
  }

  function deleteUser(user) {
    group_member.remove(user);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    console.log(input);
    if (input == "") {
      search_result.empty();
    } else{
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users){
        search_result.empty();
        $("input[name='group[user_ids][]']").each(function() {
          var member_id = $(this).attr('value');
          users.some(function(v, i){
            if (v.id==member_id) users.splice(i,1);
          });
        });
        if (users.length !== 0) {
          users.forEach(function(user) {
            showUser(user);
          });
        } else {
          search_result.append(`<div class="chat-group-user clearfix">一致するユーザはいません</div>`)
        }
      })
      .fail(function(){
        alert("ユーザー検索に失敗しました")
      })
    }
  });

  $("#user-search-result").on('click', '.user-search-add', function() {
    appendUser($(this));
  });

  $("#chat-group-users").on("click", '.js-remove-btn', function() {
    $(this).parent().remove();
  })

  $("#user-search-result").on("click", '.js-add-btn', function() {
    $(this).parent().remove();
  })
});
