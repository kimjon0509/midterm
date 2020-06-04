// const {listingPage, productListing} = require('./search');

const searchCategory = (category) => {
  return $.ajax({
    method: "GET",
    url: `/api/dropdown/${category}`
  });
}

$(() => {
  $('.category-select').click(function(e) {
    e.preventDefault();
    window.listingPage();
    let category = $(this).attr('data-category');
    console.log('clicked')
    searchCategory(category)
      .then(datas => {
        console.log(datas)
        for (let i in datas) {
          window.productListing(datas[i])
        }
      })
      .then(() => {
        $('.boxes_home_page').click(function(e) {
        e.preventDefault();
        const productId = $(this).attr('data-product-id');
        $('.main-content').empty();
        window.renderProductsPage(productId)
          .then(() => {
            console.log(productId)
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
              sendMessageToDatabase($data)
              .then(() => {
                console.log('sent data reset form')
                $('.message-user').empty();
                $('.message-user').append(`
                <p> Message Sent! </p>
                `)
                })
              })
            });
          });
        })
      })
  })

});
