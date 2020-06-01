const getAllMessages = () => {
  return $.ajax({
    method: "GET",
    url: `/api/messages/`,
  })
}
const getUser = (user_id) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${user_id}`
   })
}
const getAllMessagesUserSell = (user_id) => {
  return $.ajax({
    method: "GET",
    url:`/api/messages/?seller_id=${user_id}`,
  })
}

const getAllMessagesUserBuy = (user_id) => {
  return $.ajax({
    method: "GET",
    url:`/api/messages/?buyer_id=${user_id}`,
  })
}

const renderMessageAll = (user_id) => {
  getAllMessagesUserSell(user_id)
    .then(messages => {
      for (message of messages) {
        $('#sell-messages').append(`
          <a class="user-messages" id=${message.id}>
            <div class="message-padding">
              <div class="message-box">
                <span class='image-padding'>
                  <img alt="user picture" src=${message.profile_photo}>
                </span>
                <div class="message-details">
                  <h5>${message.user_name}</h5>
                  <p>${message.content}</p>
                </div>
              </div>
            </div>
          </a>
          `)
        }
      })
}

// const getMessageData = (message_id) => {
//   return $.ajax({
//     method: "GET",
//     url: `/api/messages/message/${message_id}`,
//   })
// }

const getMessageData = (message_id) => {
  return $.ajax({
    method: "GET",
    url: `/api/messages/?message_id=${message_id}`,
  })
}

const renderMessageUser = (message_id) => {
  getMessageData(message_id)
  .then (res => {
    let details = (res[0]);
    $('.message-header').append(`
      <img alt="user picture" src=${details.profile_photo}>
      <h2> ${details.user_name} </h2>
    `)
    $('.message-bubble').append(`
      <ul class="">
        <li class="him">By Other User</li>
        <li class="me">By this User, first message</li>
        <li class="me">By this User, secondmessage</li>
        <li class="me">By this User, third message</li>
        <li class="me">By this User, fourth message</li>
      <li class="him">By Other User</li>
        <li class="me">By this User, first message</li>
        <li class="me">By this User, secondmessage</li>
        <li class="me">By this User, third message</li>
        <li class="me">By this User, fourth message</li>
      <li class="him">By Other User</li>
        <li class="me">By this User, first message</li>
        <li class="me">By this User, secondmessage</li>
        <li class="me">By this User, third message</li>
        <li class="me">By this User, fourth message</li>
      </ul>
    `)

    $('.messages-detail-bar').append(`
      <div class="product-detail">
        <h3> ${details.product_name} </h3>
        <img alt="product image" src=${details.main_photo}>
        <p> Suggested Price: ${details.price} </p>
      </div>
    `)
  })
};

const user_logged_in = () => {};

const renderMessagesPage = () => {
  return $('.main-content').append(
  `<div class="messages">
  <div class="messages-tab">
    <div class="tab-header">
      <div class="conversation">
        <h3> Messages </h3>
      </div>
      <div class="search-message">
        <span> <i class="fas fa-search"></i> </span>
      </div>
  </div>
  <!-- render past messages-->
  <div class="buy-sell-message">
    <a href="#sell-messages" class ="nav-tab nav-tab-active" id='sell-tab'> Sell </a>
    <a href="#buy-messages" class ="nav-tab"id='buy-tab'> Buy </a>
  </div>
    <div class="scroll-messages">
      <section id="sell-messages" class="tab-content active">

      </section>
      <section id="buy-messages" class="tab-content">

      </section>
    </div>
  </div>
    <div class="message-area">
      <div class="message-header">

      </div>
      <!-- Need to render messages-->
      <div class="block-messages">
        <div class="message-bubble">
          <!--Created example message bubble-->

          <ul>
          </ul>

        </div>
      </div>
      <div class="text-area">
        <form action="" method="POST">
          <textarea placeholder="Type a message..."></textarea>
          <div class="send-button">
            <button class="send-message" type="submit" value="send">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
    <!--Need to render-->
    <div class="messages-detail-bar">
      <!--Created example-->
    </div>
  </div>
</div>`)
}

$(() => {
  $('.message-button').click(() => {
    $('.main-content').empty();
    renderMessagesPage();
    renderMessageAll(1);
    $('.nav-tab').click(function(e) {
      //Toggle tab link
      $(this).addClass('nav-tab-active').siblings().removeClass('nav-tab-active');
      //Toggle target tab
      $($(this).attr('href')).addClass('active').siblings().removeClass('active');
    });

    $(document).on("click", ".user-messages" , function() {
      let message_id = $(this).attr('id')
      $('.message-header').empty();
      $('.message-bubble').empty();
      $('.messages-detail-bar').empty();
      renderMessageUser(message_id);
  })
  })
})
