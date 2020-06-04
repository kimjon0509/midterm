const renderRegisterPage = () => {
  return $('.main-content').append(`
  <section class="register-user">
  <h1 class="register-title">Register</h1>
  <form class="register-user-form">
      <section class="registration">
      <div class="required-icon" > * field is required</div>
        <label class="register-label">Name<span class="required-icon">*</span>:</label>
          <input type="text" id="input-name" name="message" placeholder="Type name" required></input>
        <label class="register-label">Email<span class="required-icon">*</span>: </label>
          <input type="email" id="input-email" name="email" placeholder="Type email" required></input>
        <label class="register-label">Password<span class="required-icon">*</span>:</label>
          <input type="password" id="input-password" name="password" placeholder="Type password" required></input>
        <label class="register-label">Phone Number:</label>
          <input type="tel" id="input-phone" name="password" placeholder="Type Phone Number"></input>
        <button type="submit" class="registration-button">Submit</button>
      </section>
   <img src="https://cdn.wallpapersafari.com/59/46/VAujBZ.jpg" class="img-registration">
    </form>
  </section>`)
}

const checkerUserRegistered = (email) => {
  return $.ajax({
    method: "GET",
    url: `api/register/?email=${email}`
  })
}

$(() => {
  $('.register-button').click(() => {
    $('.main-content').empty();
    renderRegisterPage()
  })

  $(document).on('submit', '.register-user-form', function(e) {
    e.preventDefault();
    const name = $('#input-name').val()
    const email = $('#input-email').val()
    const password = $('#input-password').val()
    const phone = $('#input-phone').val()
    console.log(name, email, phone, password)
    checkerUserRegistered(email)
      .then((data) => {
        console.log(data, 'check ugh')
        console.log(data[0].exists, 'need to get bool')
        if(!data[0].exists) {
          $.ajax({
            method: "POST",
            url: `/api/register`,
            data: {name: name,
                  email: email,
                  password: password,
                  phone: phone
            }
          })
          .then(res => {
            let user = res[0];
            $('#em').val(user.email)
            $('#pword').val(user.password)
            $('#login').click();
          })
        } else {
          alert('this email already being used')
        }
      })
    })
  });
