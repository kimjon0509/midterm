const getProductSellerInfo = (product_id) => {
  console.log('product_id ', product_id)
 return $.ajax({
  method: "GET",
  url: `/api/products/${product_id}`
 });
}

const renderProductsPage = (product_id) => {
  console.log('fetching data for product id', product_id)
  return getProductSellerInfo(product_id)
    .then(res => {
      console.log('data for product',res);
      let data = res[0];
      console.log('data', res)
      console.log('data response',data)
      $('.main-content').append(`
      <div class="product-page" data-product-id=${product_id}>
        <div class="top-products-page">
          <div class="product-title">
            <h1>${data.product_name}</h1>
            <p> $${data.price} </p>
          </div>
          <div class='favorited-item'>
          </div>
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
                <button class="msg-temp"> Hi, is this still available? </button>
                <button class="msg-temp"> Is the price negotiable? </button>
                <button class="msg-temp"> I would Like to purchase this item </button>
              </div>
              <div class="form-block">
                <form class="message-to-user">
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

const sendMessageToDatabase = (message, product_id) => {
  console.log(message, product_id, "this is the message")
  return getProductSellerInfo(product_id)
    .then((res) => {
      let data = res[0];
      $.ajax({
      method: "POST",
      url: "/api/messages/",
      data: {text: message,
            seller_id: data.seller_id,
            buyer_id: 1,
            timestamp: Date.now(),
            product_id: data.product_id
            },
    })
  })
}

const checkFavourites = (user_id, product_id) => {
  console.log(user_id, product_id)
  return $.ajax({
    method: "GET",
    url: `api/favourites/?product_id=${product_id}&user_id=${user_id}`
  })
}

const renderFavouritesButton = (user_id, product_id) => {
  checkFavourites(user_id, product_id)
    .then(res => {
      if (res[0].exists === true) {
        $('.favorited-item').append(`
        <i class="fas fa-heart"></i>
        `)
      } else {
        $('.favorited-item').append(`
        <i class="far fa-heart"></i>
        `)
      }
    }
    )
}

const delFavBttn = (user_id, product_id) => {
  return $.ajax({
    method: "POST",
    url: `api/favourites/del/?product_id=${product_id}&user_id=${user_id}`
  })
}

const addFavBttn = (user_id, product_id) => {
  return $.ajax({
    method: "POST",
    url: `api/favourites/add/?product_id=${product_id}&user_id=${user_id}`
  })
}

$(() => {
  $('.product-click-temp').click(function(e) {
    e.preventDefault();
    console.log('clicked')
    const productId = $(this).attr('data-product-id')
    $('.main-content').empty();
    console.log(productId, 'product_id')
    // get product id from main page img
    renderProductsPage(productId)
      .then(() => {
        renderFavouritesButton(1,productId)
      })
      .then(() => {
        $('.msg-temp').click(function(e) {
          e.preventDefault();
          const val = $(this).text();
          $('textarea').val(val)
        $('.message-to-user').submit(function(e){
          e.preventDefault();
          const $data = $('textarea').val()
          sendMessageToDatabase($data, productId)
          .then(() => {
            console.log('sent data reset form')
            $('.message-user').empty();
            $('.message-user').append(`
            <p> Message Sent! </p>
            `)
            })
          })
        });
      })

      // NEED TO CHANGE USER
    $(document).on('click', '.favorited-item', function(e) {
      e.preventDefault();
      const children = $('.favorited-item').children()[0];
      const favoriteIcon = $(children).attr('class')
      console.log(favoriteIcon)
      if (favoriteIcon === 'fas fa-heart') {
        console.log('dislike')
        $('.favorited-item').empty()
        $('.favorited-item').append(`
        <i class="far fa-heart"></i>
        `)
        delFavBttn(1, productId)
      } else {
        console.log('like')
        $('.favorited-item').empty()
        $('.favorited-item').append(`
        <i class="fas fa-heart"></i>
        `)
        addFavBttn(1, productId)
      }
    })
    })
})

window.renderProductsPage = renderProductsPage;
window.checkFavourites = checkFavourites;
window.renderFavouritesButton = renderFavouritesButton;
window.delFavBttn = delFavBttn;
window.delFavBttn = delFavBttn;
