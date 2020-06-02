const getProductSellerInfo = (product_id) => {
 return $.ajax({
  method: "GET",
  url: "/api/products/:id"
 });
}

const renderProductsPage = (product_id) => {
  getProductSellerInfo(product_id)
    .then(res => {
      console.log(res);
      $('.main-container').append(`
      <div class="product-page">
        <div class="product-title">
          <h1> iPhone</h1>
          <p> $100 </p>
        </div>
        <div class="centre-content">
          <div class="product-images">
            <div class="main-photo">
              <img src="https://img.gadgethacks.com/img/93/66/63630107998081/0/your-face-could-unlock-new-iphone-8.w1456.jpg" alt="">
            </div>
            <div class="sub-photos">
              <img src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-8-plus-0.jpg" alt="">
              <img src="https://cnet2.cbsistatic.com/img/bPObRKPTSa3vMhoLdoXO2NjZHgs=/940x0/2020/04/15/b00d3937-cb2a-4f85-a4bf-7a47bcca2c39/apple-iphone-se-phone-2.jpg" alt="">
              <img src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202003/iPhone_12-770x433.png?g98huwR6VuNvG4NggzFZSEpT85Y.Ec9q" alt="">
              <img src="https://images.iphonephotographyschool.com/22342/481/iPhone-Photography-School-Home-Image-22x.jpg" alt="">
            </div>
          </div>
          <div class="right-container">
            <div class="user-info">
              <div class="user-name">
                <h3>User Name</h3>
              </div>
              <div class="user-image">
                <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png" alt="">
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
                      <textarea></textarea>
                    </div>
                    <div class="text-send">
                      <button>Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="product-description">
          <h3>Description</h3>
          <p>This is an iPhone</p>
        </div>
      </div>
      `);
    });
}

$(() => {
  $('.product-button').click(() => {
    console.log('working')
    $('.main-content').empty();
    renderProductsPage(1);
  })
})
