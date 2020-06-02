const renderFavouritesPage = () => {
  return $('.main-content').append(`
  <section class="favourites-body">
  <h3> Filters </h3>
  <section class="filters">
    <form method="POST">
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
    <option value="6"> Headphones </option>
    <option value="7"> Printer </option>
    <option value="8"> Tablet </option>
    <option value="9"> Laptop </option>
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
  <h1 class="title">Favourites</h1>
  <div class="boxes"><img class="img-favourites" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Arduino_ftdi_chip-1.jpg/1920px-Arduino_ftdi_chip-1.jpg">
    <p class="information"> information </p>
    <ul class="ul-favourites">
      <li> text 1 </li>
      <li> text 2 </li>
      <li> text 3 </li>
      <li> text 4 </li>
    </ul>
    <form method="POST" class="text"> Message User:
        <input type="message" name= "message" placeholder="Type Message..."> </input>
        <button type="submit">Submit </button>
    </form>

  </div>
  <div class="boxes">
    <img class="img-favourites" src="https://www.online-tech-tips.com/wp-content/uploads/2019/12/electronic-gadgets.jpeg">
    <p class="information">Favourite box 2 </p>
    <ul class="ul-favourites">
      <li>text 1</li>
      <li>text 2</li>
      <li>text 3</li>
      <li>text 4</li>
    </ul>
    <form method="POST" class="text"> Message User:
        <input type="message" name= "message" placeholder="Type Message..."> </input>
        <button type="submit">Submit </button>
    </form>
</div>
</section>`
  )
}

$(() => {
  $('.favourites-button').click(() => {
    $('.main-content').empty();
    renderFavouritesPage();
  })
})
