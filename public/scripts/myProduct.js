const renderMyProductsPage = () => {
  $('.main-content').append(`
  <section class="products-body">
    <h1 class="title">My Products</h1>
    <div class='boxes'>
    </div>
  </section>`
  )
}

const getMyProducts = (user_id) => {
  return $.ajax({
    method: "GET",
    url: `api/myproducts/${user_id}`
  })
 }
const renderMyProducts = (data) => {
  $('.boxes').append(
  `<div class="delete-product" data-product-id=${data.product_id}>
    <div class='product-item'>
    <i class="far fa-trash-alt"></i>
    </div>
    <img class="img-my-product" src=${data.main_photo}>
    <p class="information"> ${data.description} </p>
    <ul class="ul-product">
      <li> Price: $${data.price} </li>
      <li> Condition: ${data.condition} </li>
      <li> Category: ${data.category}</li>
    </ul>
  </div>`
  )
}

const delProductBttn = (product_id) => {
  console.log('del button clicked')
  return $.ajax({
    method: "POST",
    url: `api/myproducts/del/?product_id=${product_id}`
  })
}

$(() => {
  $('.my-product').click(() => {
    $('.main-content').empty();
    renderMyProductsPage()
    getMyProducts(1)
      .then((datas) => {
        for (let data of datas) {
          renderMyProducts(data)
        }
      })
  })

  $(document).on('click', '.product-item', function(e) {
    console.log('clicked on product item ')
    e.preventDefault();
    const productId = $(this).closest('.delete-product').attr('data-product-id')
    delProductBttn(productId)
    $('.boxes').empty();
    getMyProducts(1)
      .then((datas) => {
        for (let data of datas) {
          renderMyProducts(data)
        }
      })
  })
})
