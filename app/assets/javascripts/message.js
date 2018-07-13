$(function() {
  function buildHTML(message){
      if( message.image["url"] !== null) {
      var html = `<div class="message-box">
                    <div class="message-box__upper-box">
                      <h3 class="message-box__name">
                        ${ message.user_name}
                      </h3>
                      <p class="message-box__date">
                        ${ message.created_date}
                      </p>
                    </div>
                    <p class="message-box__content">
                      ${ message.content }
                    </p>
                    <img class="lower_message__image" src="${ message.image["url"]}">
                    </div>`
      } else {
          var html = `<div class="message-box">
                <div class="message-box__upper-box">
                  <h3 class="message-box__name">
                    ${ message.user_name}
                  </h3>
                  <p class="message-box__date">
                    ${ message.created_date}
                  </p>
                </div>
                <p class="message-box__content">
                  ${ message.content }
                </p>
              </div>`
        }
      return html;
  }
  $('.new_message').on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.pathname;
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.index__contents__right-content__message-space').append(html);
      $('.message-form').val('');
      $('.hidden-image-form').val('');
      $('.index__contents__right-content__message-space').animate({
        scrollTop: $('.index__contents__right-content__message-space')[0].scrollHeight
      },{duration:500});
    })
    .fail(function(){
      alert('error');
    })
  });
});

// if($(.message-form).val() == "")
// /public/uploads/message/image/${ message.image_url}/
