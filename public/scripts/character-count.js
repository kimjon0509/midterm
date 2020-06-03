
// CAN DELETE THIS

$(document).ready(function() {
  $(".description-input").on("keyup", function () {
    console.log("working");
    let newCounter = 400 - this.value.length;
    const search = $(this).closest("form").find(".counter")
    search.val(newCounter);
    if (newCounter < 0) {
      // keeping this temporarily, can formulate error messages in main client js.
      alert("Too Long!!")
    }
  })
})
