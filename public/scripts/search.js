const listingPage = () => {
  console.log('empty')
  $('.main-content').empty();
  $('.main-content').append(`
    <div class="listings-body">
        <h3 class="listings-title"> Filters </h3>
        <form method="POST">
          <section class="filters">
            <input type="integer" placeholder="Minimum Price"></input>
            <input type="integer" placeholder="Maximum Price"></input>
          </section>
          <section class="filters">
            <div class="custom-select">
              <select>
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
          <div class="custom-select">
            <select>
              <option value="0"> Select Condition: </option>
              <option value="1"> Very Bad </option>
              <option value="2"> Bad </option>
              <option value="3"> Good </option>
              <option value="4"> Very Good </option>
              <option value="5"> Excellent </option>
              <option value="6"> Brand-new </option>
            </select>
          </div>
          </section>
          <button type="submit" class="filter-button">Submit</button>
      </form>
      <section class="total-boxes">

      </section>
    </div>
  `);
}

const getSearchVal = (url) => {
  return $.ajax({
    method: "GET",
    url: `/api/search/${url}`
  });
}

$(() => {
  $('.search-bar').keydown((e) => {
    if(e.key == 'Enter') {
      console.log('key pressed')
      let url = '';
      e.preventDefault();
      const search_val = $('.search-input').val().split(' ');
      for (let i in search_val) {
        if (i === 0 || i === '0') {
          url += `?search${i}=${search_val[i]}`
        } else {
          url += `&search${i}=${search_val[i]}`
        }
      }
      listingPage()
      getSearchVal(url)
        .then(datas => {
          for (let i in datas) {
            console.log(datas[i])
            $('.total-boxes').append(`
            <div class="boxes_home_page">
              <span class="title" id="Name"> ${datas[i].name} </span>
              <img class="img_home_page" src=${datas[i].main_photo}>
              <p class="title" id="description">${datas[i].description}</p>
              <ul class="features">
                <li> price: $${datas[i].price} </li>
                <li> condition: ${datas[i].condition} </li>
                <li> category: ${datas[i].category} </li>
              </ul>
              <form class="title" method="POST">
                <input type="message" name="message" placeholder="Type Message..."></input>
                <button type="submit"> Submit </button>
              </form>
            </div>
            `)
          }
        })
    };
  })
});

