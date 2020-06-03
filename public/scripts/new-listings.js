const renderNewListings = () => {
  return $('.main-content').append(`
  <h1 class="new-title">New Listing</h1>
    <form class="listing-inputs">
      <section class="row1">
      <label class="labels">
        <input type="text" name="text" placeholder="Product Name">
      </label>
        </input>
      <label class="labels">
        <input type="text" name="text" placeholder="Sub-Image">
        </label>
        </input>
    </section>
    <section class="row1">
      <label class="labels">
        <input type="text" name="text" placeholder="Price">
      </label>
        </input>
      <label class="labels">
        <input type="text" name="text" placeholder="Sub-Image 2">
        </label>
        </input>
    </section>
<section class="row1">
      <label class="labels">
        <input type="text" name="text" placeholder="Product Category">
      </label>
        </input>
      <label class="labels">
        <input type="text" name="text" placeholder="Sub-Image 3">
        </label>
        </input>
    </section>
<section class="row1">
      <label class="labels">
        <input type="text" name="text" placeholder="Main Image">
      </label>
        </input>
      <label class="labels">
        <input type="text" name="text" placeholder="Sub-Image 4">
        </label>
        </input>
    </section>
  <label class="last-label">
    <textarea class="description-input" type="text" name="text" placeholder="Description"></textarea>
</label>
</input>
<section class="under-text">
<output name="counter" class="counter" for="description-input">400</output>
    <button type="Submit" class="new-button">Submit Listing</button>
    </section>
      </form>`)
}



$(() => {
  $('.new-listing_button').click(() => {
    $('.main-content').empty();
    renderNewListings();
    $(document).ready(function() {
      $(".description-input").on("keyup", function () {
        let newCounter = 400 - this.value.length;
        const search = $(this).closest("form").find(".counter")
        search.val(newCounter);
        if (newCounter < 0) {
          // keeping this temporarily, can formulate error messages in main client js.
          alert("Too Long!!")
        }
      })
    })
  })

})
