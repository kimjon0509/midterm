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
        window.renderProductsPage(productId);
        })
      })
  })
});
