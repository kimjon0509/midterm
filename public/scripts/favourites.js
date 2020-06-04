const renderFavouritesPage = () => {
  $('.main-content').append(`
  <section class="favourites-body">
    <h1 class="title">Favourites</h1>
    <div class='boxes'>
    </div>
  </section>`
  )
}

const getFavProducts = (user_id) => {
  return $.ajax({
    method: "GET",
    url: `api/favourites/${user_id}`
  })
 }
const renderFavoriteProducts = (data) => {
  console.log(data)
  $('.boxes').append(
  `<div class="favorite-product" data-product-id=${data.product_id}>
    <div class='favorited-item'>
    <i class="fas fa-heart"></i>
    </div>
    <img class="img-favourites" src=${data.main_photo}>
    <p class="information"> ${data.description} </p>
    <ul class="ul-favourites">
      <li> Price: $${data.price} </li>
      <li> Condition: ${data.condition} </li>
      <li> Category: ${data.category}</li>
      <li> Seller: ${data.user_name} </li>
    </ul>
  </div>`
  )
}

$(() => {
  $('.favourites-button').click(() => {
    $('.main-content').empty();
    renderFavouritesPage()
    getFavProducts(1)
      .then((datas) => {
        for (let data of datas) {
          renderFavoriteProducts(data)
        }
      })
  })

  $(document).on('click', '.favorited-item', function(e) {
    e.preventDefault();
    const productId = $(this).closest('.favorite-product').attr('data-product-id')
    delFavBttn(1, productId)
    $('.boxes').empty();
    getFavProducts(1)
      .then((datas) => {
        for (let data of datas) {
          renderFavoriteProducts(data)
        }
      })
  })
})
