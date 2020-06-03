const getProductSellerInfo = (product_id) => {
 return $.ajax({
  method: "GET",
  url: `/api/products/${product_id}`
 });
}

const renderProductsPage = (product_id) => {
  getProductSellerInfo(product_id)
    .then(res => {
      //console.log(res[0], 'test');
      let data = res[0];
      $('.main-content').append(`
      <div class="product-page">
        <div class="product-title">
          <h1>${data.product_name}</h1>
          <p> $${data.price} </p>
        </div>
        <div class="centre-content">
          <div class="product-images">
            <div class="main-photo">
              <img src=${data.main_photo} alt="main-image">
            </div>
            <div class="sub-photos">
              <img src=${data.sub_photo1} alt="">
              <img src=${data.sub_photo2}" alt="">
              <img src=${data.sub_photo3} alt="">
              <img src=${data.sub_photo4} alt="">
            </div>
          </div>
          <div class="right-container">
            <div class="user-info">
              <div class="user-name">
                <h3>${data.user_name}</h3>
              </div>
              <div class="user-image">
                <img src=${data.profile_photo}alt="">
              </div>
            </div>
            <div class="message-user">
              <h3> Message User </h3>
              <div class="message-template">
                <button> Hi, is this still available? </button>
                <button> Is the price negotiable? </button>
                <button> I would Like to purchase this item </button>
              </div>
              <div class="form-block">
                <form>
                  <div class="form-layout">
                    <div class="text-input">
                      <textarea name="text"></textarea>
                    </div>
                    <div class="text-send">
                      <input type="submit" value="Send Message"></input>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="product-description">
          <h3>Description</h3>
          <p>${data.description}</p>
        </div>
      </div>
      `);
    });
}

const sendMessageToDatabase = (message) => {
  console.log(message, "this is the message")
  return $.ajax({
    method: "POST",
    url: "/api/messages/",
    data: {text: message,
           seller_id: 2,
           buyer_id: 1,
           timestamp: Date.now(),
           product_id: 2
          },
  })
}

$(() => {
  $('.product-click-temp').click(() => {
    console.log('clicked')
    $('.main-content').empty();
    // get product id from main page img
    renderProductsPage(3);
  })
  $(document).on("click", "button" , function() {
    const val = $(this).text();
    $('textarea').val(val)
  });

  $(document).on("submit", "form", function(e){
    e.preventDefault();
    const $data = $('textarea').val()
    sendMessageToDatabase($data)
    .then(() => {
      console.log('sent data reset form')
      $('.message-user').empty();
      $('.message-user').append(`
      <p> Message Sent! </p>
      `)
      })
    })
})


