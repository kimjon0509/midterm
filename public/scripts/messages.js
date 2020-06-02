const getAllMessages = (user_id) => {
  return $.ajax({
    method: "GET",
    url: `/api/messages/?user_id=${user_id}`
    })
}

getMessageSell = (message_id) => {
  return $.ajax({
    method: "GET",
    url: `/api/messages/sell/?message_id=${message_id}`,
  })
}

getMessageBuy = (message_id) => {
  return $.ajax({
    method: "GET",
    url: `/api/messages/buy/?message_id=${message_id}`,
  })
}

const getMessageData = (message_id) => {
  return $.ajax({
    method: "GET",
    url: `/api/messages/message/${message_id}`,
  })
  .then(res => {
    if (res[0].seller_id === 1) {
      return getMessageSell(message_id)
    } else if (res[0].buyer_id === 1) {
      return getMessageBuy(message_id)
    }
  })
}

//need to get id using cookie
const renderMessageAll = (user_id) => {
  getAllMessages(user_id)
    .then(messages => {
      for (message of messages) {
        if (message.seller_id === 1) {
          getMessageSell(message.id)
            .then(res => {
              $('#sell-messages').append(`
              <a class="user-messages" id=${res[0].id}>
                <div class="message-padding">
                  <div class="message-box">
                    <span class='image-padding'>
                      <img alt="user picture" src=${res[0].profile_photo}>
                    </span>
                    <div class="message-details">
                      <h5>${res[0].user_name}</h5>
                      <p>${res[0].content}</p>
                    </div>
                  </div>
                </div>
              </a>
              `)})
        } else if (message.buyer_id === 1) {
          getMessageBuy(message.id)
            .then(res => {
              $('#buy-messages').append(`
                <a class="user-messages" id=${res[0].id}>
                  <div class="message-padding">
                    <div class="message-box">
                      <span class='image-padding'>
                        <img alt="user picture" src=${res[0].profile_photo}>
                      </span>
                      <div class="message-details">
                        <h5>${res[0].user_name}</h5>
                        <p>${res[0].content}</p>
                      </div>
                    </div>
                  </div>
                </a>
          `)
            })
        }
      }
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
