const renderRegisterPage = () => {
  return $('.main-content').append(`
  <section class="page">
  <h1 class="register-title">Register</h1>
  <form method="POST" class="outline">
      <section class="registration">
      <label class="register-label">Name:</label>
        <input type="message" class="input-message" name="message" placeholder="Type name">
</input>
    <label class="register-label">Email: </label><input type="message" class="input-message" name="message" placeholder="Type email"></input>
  <label class="register-label">Password:</label> <input type="message" class="input-message" name="message" placeholder="Type password"></input>
  <button type="submit" class="registration-button">Submit</button>
  </section>
   <img src="https://s.yimg.com/ny/api/res/1.2/12UU2JphAsbxTTDca.7QFQ--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9MTA4MDtoPTcxNg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2019-11/7b5b5330-112b-11ea-a77f-7c019be7ecae" class="img-registration">

    </form>
    </section>`)
}
$(() => {
$('.register-button').click(() => {
  $('.main-content').empty();
  renderRegisterPage();
})
});


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

