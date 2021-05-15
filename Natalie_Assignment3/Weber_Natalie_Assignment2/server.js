//Assignment 3 Kaka'ako Surf Co. Sever
//Created by Natalie Weber
//Code for server copied and modified from Lab 13, Lab 14, Assignment 1, Assignment 2 and my previos assignments from Fall 2020
var data = require('./public/products.js'); //sets products.js file and set to variable 'data'
var allProducts = data.allProducts; // sets variable 'allProducts' to the products in the products.js file
var qs = require('qs'); //Sets variable qs to require querystring module
var fs = require('fs'); //Sets variable fs to require file system
var express = require('express'); //begins and caches express module
var app = express(); //set express to variable 'app'
var myParser = require("body-parser"); //loads and chaches body-parser module as variable "myParser"
app.use(myParser.urlencoded({ extended: true })); //Parses data from body
app.use(myParser.json()); //Parses json POSTS
var session = require('express-session'); //Requires express-session module
var cookieParser = require('cookie-parser'); //Requires cookie-parser
app.use(cookieParser()); //Cookie-parser middleware
//Processes all incoming requests and records them in the console
app.all('*', function (req, res, next) { //for all request methods...
  console.log(req.method + ' to ' + req.path); //generates the request method and its path in the console
  next();
});
//app.use(cookieParser()); //CookieParser middleware
var user_data = 'user_data.json'; //Sets user_data.json to variable "user_data"
if (fs.existsSync(user_data)) {
  var users_reg_data = JSON.parse(fs.readFileSync('./user_data.json', 'utf-8'));
}
else {
  console.log(`${user_data} does not exist!`)
}
const nodemailer = require("nodemailer"); //Requires nodemailer module

//Checks if quantities are valid using NonNegInt function from Assignment 1 modified using a product_key to post and save a session's quantities to Shopping Cart
app.post("/process_form", function (request, response) { //Modified app.post process_purchase function from Assignment 2
  console.log(request.session);
  let POST = request.body; //POST requests data in body
  if (typeof POST['addProducts${i}'] != 'undefined') {
    product_key = POST["product_key"]; //POSTs the product_key
    products = allProducts[product_key];
    var hasvalidquantities = true; //Assumes valid quantities
    let quantities = [];
    for (i = 0; i < products; i++) {
      qty = POST[`quantity${i}`]; //POSTs quantity
      hasquantities = hasquantities || qty > 0;
      hasvalidquantities = hasvalidquantities && isNonNegInt(qty); ///If quantity is both greater than 0 and valid
    }
    //Code borrowed from Professor Port's screencast "Getting Started With Assignment 2"
    //Following code retains query string from products_display.html
    if (hasvalidquantities) { //If valid, add quantities from the session to cart
      if (typeof request.session.cart == "undefined") {
        request.session.cart = {};
      }
      request.session.cart[product_key] = quantities; //Posts user's session
      POST["message"] = "Successfully added to cart!";
    } else {
      POST["message"] = "Invalid quantities, cart not updated!";
    }
    const stringify = qs.stringify(POST);
    console.log(request.session);
    response.redirect(`./.html?${stringify}`);
  }
});

//Processes login through post method using examples from Lab 14 and screencasts
app.post("/process_login", function (req, res, next) {
  var LogError = [];
  console.log(req.query); //Requests query string
  username = req.body.username.toLowerCase(); //Sets username to all lowercase
  if (typeof users_reg_data[username] != 'undefined') { //If the username data does not equal undefined...
    if (users_reg_data[username].password == req.body.password) {
      req.query.username = username;
      console.log(users_reg_data[req.query.username].name);
      req.query.name = users_reg_data[req.query.username].name
      res.redirect('/checkout.html?' + qs.stringify(req.query));
      return; //Redirects to checkout if no errors are encountered
    } else { //Invalid password error
      LogError.push = ('Invalid password');
      console.log(LogError);
      req.query.username = username;
      req.query.name = users_reg_data[username].name;
      req.query.LogError = LogError.join(';');
    }
  } else { //Invalid username error
    LogError.push = ('Invalid username');
    console.log(LogError);
    req.query.username = username;
    req.query.LogError = LogError.join(';');
  } //Redircts to login if there are username and password errors
  res.redirect('./login.html?' + qs.stringify(req.query));
});

//Registers a new user account server side processing and post method 
app.post("/process_register", function (req, res) {
  qstr = req.body
  console.log(qstr);
  var errors = [];

  if (/^[A-Za-z]+$/.test(req.body.name)) { //Only letters in full name field
  }
  else {
    errors.push('Use only letters') //Diplays invalid character error
  }
  //Full name validation
  if (req.body.name == "") {
    errors.push('Invalid full name');
  }
  var reguser = req.body.username.toLowerCase(); //Checks that username is in lowercase format
  if (typeof users_reg_data[reguser] != 'undefined') { //Error displays if username is already taken or is undefined
    errors.push('Username taken')
  }
  if (/^[0-9a-zA-Z]+$/.test(req.body.username)) { //Requires only letters and numbers in username
  }
  else {
    errors.push('Use only letters and numbers')
  }
  //E-Mail Validation code borrowed and modified from Lab 14 examples
  //Retains query string with order quantities if user registers as a new member
  if (req.body.password.length < 6) { //Requires password minimum of 6 characters
    errors.push('Password Minimum 6 Characters')
  }
  if (req.body.password !== req.body.repeat_password) { //Checks if passwords match
    errors.push('Password Not a Match')
  }
  //User's registration is saved in user_data.json if there are no errors
  req.query.name = req.body.name;
  req.query.username = req.body.username;
  req.query.email = req.body.email;
  if (errors.length == 0) {
    console.log('No errors')
    var username = req.body.username;
    users_reg_data[username] = {}; //make it 'users'
    users_reg_data[username].name = req.body.name;
    users_reg_data[username].password = req.body.password;
    users_reg_data[username].email = req.body.email;

    fs.writeFileSync(user_data, JSON.stringify(users_reg_data, null, 2));
    res.cookie("username", username);
    res.cookie("name", fullname);
    res.cookie("email", req.body.email);
    res.redirect('./checkout.html'); //Redirects to checkout upon successful registration
  }
  //Borrowed and modified from Lab 14, logs errors in console and redirects to registration page
  else {
    console.log(errors)
    req.query.errors = errors.join(';');
    res.redirect('registration.html?' + qs.stringify(req.query)); //Redirects to register.html if there are errors
  }
});

//Processing logout
app.get("/logout", function (req, res) {
  str = `<script>alert("${req.cookies['username']} is logged out"); location.href="./index.html";</script>`; //Sends logout string
  res.clearCookie('username'); //Clears cookies
  res.send(str);
  req.session.destroy(); //Terminates session
  res.redirect('./index.html'); // Redirect user to home page
});

//Posts checkout.html information and generates invoice on the server to email to the user. The invoice will then be displayed on the checkout.html page.
app.post("/generateInvoice", function (req, res) {
  cart = JSON.parse(req.query['cartData']); //this parses the cart 
  cookie = JSON.parse(req.query['cookieData']); //this parses the cookies 
  var email = users_reg_data[req.cookies.username].email;
  str = `<link href="./style/invoice.css" rel="stylesheet">
  <h1>Purchase confirmed!</h1>
  <br><b>Thank you for shopping at Kaka'ako Surf Co.!</b></br>
    <br><b>An email has been sent to ${email}.</b></br>
    <br><b><a href="/logout">Clear cookies and sessions(Logout)</a></b></br>
    <table>
        <tbody>
            <tr>
                <th style="text-align: left;" width="43%">Product</th>
                <th style="text-align: center;" width="10%">Quantity</th>
                <th style="text-align: right;" width="10%">Price</th>
            </tr>`;
  subtotal = 0
  for (let prodtype in cart_data) {
    products = allProducts[prodtype];
    quantities = cart_data[prodtype];
    for (i in quantities) {
      if (quantities[i] > 0) { //If quantities are greater than 0, execute the function and give subtotal
        extended_price = quantities[i] * products[i].price
        subtotal += extended_price;

        str +=
          `<tr>
            <td style="text-align: left;" width="43%">${products[i].name}</td>
            <td style="text-align: center;" width="10%">${quantities[i]}</td>
            <td style="text-align: right;" width="10%">${extended_price.toFixed(2)}</td>
            </tr>`;
      }
    }
  }
  // Computes tax
  var tax_rate = 0.05;
  var tax = tax_rate * subtotal;

  // Computes shipping
  shipping = 0.05 * subtotal; // 5% of subtotal

  // Compute grand total
  var total = subtotal + tax + shipping;
  str +=
    `<tr>
                <td colspan="4" width="100%">&nbsp;</td>
            </tr>

            <tr>
                <td style="text-align: left;" colspan="3" width="67%">Sub-total</td>
                <td width="54%">$
                    <script>document.write(subtotal.toFixed(2));</script>
                </td>
            </tr>

            <tr>
                <td style="text-align: left;" colspan="3" width="67%"><span>Tax</span></td>
                <td width="54%">$
                    <script>document.write(tax.toFixed(2));</script>
                </td>
            </tr>

            <tr>
                <td style="text-align: left;" colspan="3" width="67%">Shipping</span></td>
                <td width="54%">$
                    <script>document.write(shipping.toFixed(2));</script>
                    <div style="text-align: left;" class="col-50">
                        A shipping fee of 5% of the subtotal will be applied to every order.
                </td>
            </tr>

            <tr>
                <td style="text-align: left;" colspan="3" width="67%"><strong>Total</strong>
                </td>
                <td width="54%"><strong>$
                        <script>document.write(total.toFixed(2));</script>
                    </strong>
                </td>
            </tr>
        </tbody>
    </table>`;

  //Nodemailer transporter made using Assignment 3 examples and examples from Alyssa Mencel Assignment 3 Fall 2020
  var transporter = nodemailer.createTransport({ //Creates transporter variable
    host: 'mail.hawaii.edu', //Mail using hawaii.edu
    port: 25,
    secure: false,
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: 'na23@hawaii.edu', //Sends invoice from na23@hawaii.edu
    to: email, //Sends email cookie
    subject: 'Invoice',
    html: str //Returns string as HTML
  };
  //Errros in mail transporter 
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) { //If there is an error it displays in console
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  respsonse.send(str); //String displayed in browser
});

app.use(session({
  secret: 'ITM 353 Rocks!', //Encrypt session
  resave: true,
  saveUninitialized: false,
  httpOnly: false, 
  secure: true,
  ephemeral: true 
}))

app.use(express.static('./public')); //Searches for files in "public" directory
app.listen(8080, () => console.log(`listening on port 8080`)); //Listens for requests on port 8080