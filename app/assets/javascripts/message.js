$(function() {
  function buildHTML(message){
      var image_content = message.image["url"] == null ? "" : `<img class="lower_message__image" src="${ message.image["url"]}">`
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
                    ${ image_content }
                  </div>`
      return html;
  }

  function scroll_to_bottom() {
    $('.index__contents__right-content__message-space').animate({
      scrollTop: $('.index__contents__right-content__message-space')[0].scrollHeight
      },{duration:500});
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
      $('.new_message')[0].reset();
      scroll_to_bottom();
    })
    .fail(function(){
      alert('error');
    })
  });
});
