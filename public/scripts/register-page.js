$(document).ready(function () {
  var data =$("#myID").serialize();
  const registerUser =  () => {
    return $.ajax({
      method: "POST",
      url: `/api/register`,
      data: data,
      success: function (response) {

      }
    });
  }
});
