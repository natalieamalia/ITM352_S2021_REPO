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

//functions from Lab 12 order_page.html and Assignment 1 examples
function isNonNegInt(q, return_errors = false) { //Function that checks if values are postitive integers
  errors = []; //Assumes no errors at first
  if (q == '') { q = 0; } //Assumes blank inputs as quantity of 0 
  if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); //Checks if string is a number
  else if (q < 0) errors.push('<font color="red">Negative value!</font>'); //Checks if the string non-negative
  else if (parseInt(q) != q) errors.push('<font color="red">Not a full value!</font>'); //Checks if string is an integer
  return return_errors ? errors : (errors.length == 0); //Returns errors
}

function checkQuantityTextbox(qtyTextboxObj) {
  var errs = isNonNegInt(qtyTextboxObj.value, true); //Checks quantity textbox
  document.getElementById(qtyTextboxObj.name + '_message').innerHTML = errors.join(',');
}

function loadJSON(service, callback) {
  var xobj = new XMLHttpRequest(); //loads HTTP request into var xobj
  xobj.overrideMimeType("application/json");
  xobj.open('POST', service, false);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      //Required use of an anonymous callback will NOT return a value but returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function getCookie(cname) { //Function copied and modified from Lab 15 "Cookies and Sessions" and w3schools.com example https://www.w3schools.com/js/js_cookies.asp
  var name = cname + "="; //Sets cookie name
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Save product to shopping cart, sessionStorage and structure derived from https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
function saveProduct(i) {
  var productQty = product_form[`quantity${i}`].value;
  if (isNonNegInt(productQty) == true) {
      sessionStorage[`${products}${i}`] = productQty; // Save product quantity to session
      alert('Successfully added to cart!'); // Inform the user that they successfully added an item to the cart
  } 
  else {
      alert('Oops! We couldn’t add that to the cart!'); // Inform the user that there was an error
  };
  window.location.reload();

function setCookie(cname, cvalue, exdays) { //Function copied and modified from Lab 15 "Cookies and Sessions" and w3schools.com example https://www.w3schools.com/js/js_cookies.asp
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); //Sets cookie expiration
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
}