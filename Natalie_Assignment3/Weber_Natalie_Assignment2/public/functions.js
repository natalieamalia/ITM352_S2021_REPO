//Functions copied from Assignment 3 Code Examples, functions.js
//Callback function that asks server for a "service" and converts the server's response to text
// navbar.js loads into html files without having to hardcode the navbar into each page
// borrowed code from Professor Port who helped me create a navbar.js last semester for my Assignment 3 and used navbar dropdown example from W3 Schools https://www.w3schools.com/howto/howto_css_dropdown_navbar.asp example
function navbar() {
  document.write(`
  <ul>
  <li style="float:left"><a href="./index.html">Kaka'ako Surf Co.</a></li>
      <li><div class="dropdown">
      <a class="dropbtn" href="./products_display.html?product_key=Surfboards">Products</a>
      <div class="dropdown-menu">
      <div class="dropdown-content">`);
  for (let prodtype in allProducts) {
      document.write(`<a href="products_display.html?product_key=${prodtype}">${prodtype}</a><br>`)
  }
  document.write(`
      <li style="float:center"><a href="./login.html${location.search}">Login</a></li>
      <li><a href="./registration.html${location.search}">Register</a></li>
      <li style="float:right"><a href="./checkout.html${location.search}">Checkout</a></li>
  </ul >
      `);
}
