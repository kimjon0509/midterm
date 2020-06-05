const listingPage = () => {
  $('.main-content').empty();
  $('.main-content').append(`
    <div class="listings-body">
        <h3 class="listings-title"> Filters </h3>
        <form class="search-form" method="POST">
          <section class="filters">
            <div class="custom-select">
              <select id="price-select">
                <option value="0"> Select Price:</option>
                <option value="1"> Price Low-High </option>
                <option value="2"> Price High-Low </option>
              </select>
            </div>
          <div class="custom-select">
            <select id="condition-select-search">
              <option value="0"> Select Condition: </option>
              <option value="1"> Very Bad </option>
              <option value="2"> Bad </option>
              <option value="3"> Good </option>
              <option value="4"> Very Good </option>
              <option value="5"> Excellent </option>
              <option value="6"> Brand-new </option>
            </select>
          </div>
          <button type="submit" class="filter-button">Submit</button>
          </section>
      </form>
      <section class="total-boxes">

      </section>
    </div>
  `);
}

const productListing = (data) => {
  console.log('checking productlisting')
  $('.total-boxes').append(`
  <div class="boxes_home_page" data-product-id="${data.id}">
    <span class="title" id="Name"> ${data.name} </span>
    <img class="img_home_page" src=${data.main_photo}>
    <p class="title" id="description">${data.description}</p>
    <ul class="features">
      <li> price: $${data.price} </li>
      <li> condition: ${data.condition} </li>
      <li> category: ${data.category} </li>
    </ul>
    <div class='favorited-item'>
    </div>
  </div>
  `)
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
      const searchVal = $('.search-input').val().split(' ');
      for (let i in searchVal) {
        if (i === 0 || i === '0') {
          url += `?search${i}=${searchVal[i]}`
        } else {
          url += `&search${i}=${searchVal[i]}`
        }
      }
      listingPage()
      getSearchVal(url)
        .then(datas => {
          for (let i in datas) {
            productListing(datas[i])
          }
        })
      $('.boxes_home_page').click(function(e) {
        e.preventDefault();
        const productId = $(this).attr('data-product-id');
        console.log('this is product id ', productId)
        $('.main-content').empty();
          renderProductsPage(productId)
          .then(() => {
            console.log(productId)
            //super user
            renderFavouritesButton(1,productId)
          })
      })
    }
    })
  $(document).on('submit', '.search-form', function(e) {
    e.preventDefault();
    let url = '';
    let queryStart = true;
    const searchVal = $('.search-input').val().split(' ');
    const condition = $("#condition-select-search option:selected").val();
    const price = $("#price-select option:selected").val();
    console.log(searchVal, condition, price)
    if (searchVal.length !== 0) {
      for (let i in searchVal) {
        if (i === 0 || i === '0') {
          url += `?search${i}=${searchVal[i]}`
          queryStart = false;
        } else {
          url += `&search${i}=${searchVal[i]}`
        }
      }
    }

    if (condition != 0) {
      if(queryStart) {
        if (condition == 1) {
          url += `?condition=Very Bad`;
        } else if (condition == 2) {
          url += `?condition=Bad`;
        } else if (condition == 3) {
          url += `?condition=Good`;
        } else if (condition == 4) {
          url += `?condition=Very Good`;
        } else if (condition == 5) {
          url += `?condition=Excellent`
        } else if (condition == 6) {
          url += `?condition=Brand-new`
        }
        queryStart = false;
      } else {
        if (condition == 1) {
          url += `&condition=Very Bad`;
        } else if (condition == 2) {
          url += `&condition=Bad`;
        } else if (condition == 3) {
          url += `&condition=Good`;
        } else if (condition == 4) {
          url += `&condition=Very Good`;
        } else if (condition == 5) {
          url += `&condition=Excellent`
        } else if (condition == 6) {
          url += `&condition=Brand-new`
        }
      }
    }

    if (price != 0) {
      if(queryStart) {
        if (price == 1) {
          url += `?price=low-high`;
        } else if (price == 2) {
          url += `?price=high-low`;
        }
        queryStart = false;
      } else {
        if (price == 1) {
          url += `&price=low-high`;
        } else if (price == 2) {
          url += `&price=high-low`;
        }
      }
    }

    listingPage()
    getSearchVal(url)
      .then(datas => {
        console.log(datas)
        for (let i in datas) {
          productListing(datas[i])
        }
      })
  })

    // $('.message-to-user').submit(function(e){
    //   e.preventDefault();
    //   const $data = $('textarea').val()
    //   const productId = $(this).closest("div").find(".data-product-id")
    //   console.log('checking data',$data)
    //   console.log('message to user', productId)
    //   sendMessageToDatabase($data, productId)
    //   })

    // .then(() => {
          // $('.boxes_home_page').click(function(e) {
          // e.preventDefault();
          // const productId = $(this).attr('data-product-id');
          // console.log('this is product id ', productId)
          // $('.main-content').empty();
          //   renderProductsPage(productId)
          //   .then(() => {
          //     console.log(productId)
          //     //super user
          //     renderFavouritesButton(1,productId)
          //   })
            // .then(() => {
            //   $('.msg-temp').click(function(e) {
            //     e.preventDefault();
            //     const val = $(this).text();
            //     $('textarea').val(val)
            //     })
            // })

              //   .then(() => {
              //     console.log('sent data reset form')
              //     $('.message-user').empty();
              //     $('.message-user').append(`
              //     <p> Message Sent! </p>
              //     `)
              // });
            // });
          // })
});


window.listingPage = listingPage;
window.productListing =  productListing;
