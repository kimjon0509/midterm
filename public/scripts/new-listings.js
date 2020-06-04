const renderNewListings = () => {
  return $('.main-content').append(`
  <h1 class="new-title">New Listing</h1>
    <form class="new-listing-form" class="listing-inputs">
      <section class="row1">
        <label class="labels">
          <input id="input-name" type="text" placeholder="Product Name" name="name" required></input>
        </label>
        <label class="labels">
          <input id="input-sub-image2" type="url" name="text" placeholder="Sub-Image 2"></input>
        </label>
      </section>
      <section class="row1">
        <label class="labels">
          <input id="input-price" type="number" name="price" placeholder="Price" required></input>
        </label>
        <label class="labels">
          <input id="input-sub-image3" type="url" name="text" placeholder="Sub-Image 3"></input>
        </label>
      </section>
      <section class="row1">
        <label class="labels">
          <input id="input-sub-image1" type="url" name="text" placeholder="Sub-Image 1"></input>
        </label>
        <label class="labels">
          <input id="input-sub-image4" type="url" name="text" placeholder="Sub-Image 4"></input>
        </label>
      </section>
      <section class="row1">
        <label class="labels">
          <div class="custom-select">
            <select id="category-select">
              <option value="0"> Select Category:</option>
              <option value="1"> Phone </option>
              <option value="2"> Computer </option>
              <option value="3"> T.V </option>
              <option value="4"> Camera </option>
              <option value="5"> Video Games </option>
              <option value="6"> Music </option>
              <option value="7"> Printer </option>
              <option value="8"> Tablet </option>
              <option value="9"> Laptop </option>
              <option value="10"> Accessories </option>
              <option value="11"> Monitor </option>
            </select>
          </div>
        </label>
        <label class="labels">
          <div class="custom-select">
            <select id="condition-select">
              <option value="0"> Select Condition: </option>
              <option value="1"> Very Bad </option>
              <option value="2"> Bad </option>
              <option value="3"> Good </option>
              <option value="4"> Very Good </option>
              <option value="5"> Excellent </option>
              <option value="6"> Brand-new </option>
            </select>
          </div>
        </label>
          </section>
        <section class="row1">
          <label class="labels">
            <input id="input-main-photo" type="text" name="url" placeholder="Main Image" class="second-last" required></input>
          </labels>
          <label class="last-label">
            <input id="input-description" class="description-input" type="text" name="text" placeholder="Description" required></input>
          </label>
        </section>
        <section>
          <label class="last-label">
            <button type="submit" class="newListing-button">Submit</button>
          </label>
        </section>
    </form>`)
}

const postNewListings = (name, condition, category, discription, mainImage, price, subImage1, subImage2, subImage3, subImage4) => {
  console.log('posting new listing')
  return $.ajax({
    method: "POST",
    url: `/api/newListings`,
    data: {name: name,
          condition: condition,
          category: category,
          discription: discription,
          price: price,
          mainImage: mainImage,
          subImage1: subImage1,
          subImage2: subImage2,
          subImage3: subImage3,
          subImage4: subImage4,
    }
  })
}

$(() => {
  $('.new-listing_button').click(() => {
    $('.main-content').empty();
    renderNewListings();
      $(".description-input").on("keyup", function () {
        let newCounter = 400 - this.value.length;
        const search = $(this).closest("form").find(".counter")
        search.val(newCounter);
        if (newCounter < 0) {
          // keeping this temporarily, can formulate error messages in main client js.
          alert("Too Long!!")
        }
      })

    $(document).on('submit', '.new-listing-form', function(e) {
      e.preventDefault();
      const name = $('#input-name').val();
      const condition = $("#condition-select option:selected").val();
      const category = $("#category-select option:selected").val();
      const discription = $('#input-description').val();
      const mainImage = $('#input-main-photo').val();
      const price = $('#input-price').val();
      const subImage1 = $('#input-sub-image1').val();
      const subImage2 = $('#input-sub-image2').val();
      const subImage3 = $('#input-sub-image3').val();
      const subImage4 = $('#input-sub-image4').val();

      postNewListings(name, condition, category, discription, mainImage, price, subImage1, subImage2, subImage3, subImage4)
        .then(res => {
          console.log('new listing sucess', res)
          $('.main-content').empty();
          renderProductsPage(res[0].id)
      })
    })
  })

})
