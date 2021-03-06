//Natalie's Assignment 1 Kaka'ako Surf Co. server
//Code for server copied from Lab 13, Lab 14, Assignment 1, and my assignments from Fall 2020
var data = require('./public/products.js'); //sets products.js file and set to variable 'data'
var products = data.products; // sets variable 'products_array' to the products array in the products.js file
var qs = require('qs'); //Sets variable "querystring" to require querystring module
var express = require('express'); //begins and caches express module
var app = express(); //set express to variable 'app'
var myParser = require("body-parser"); //loads and chaches body-parser module as variable "myParser"

var filename = 'user_data.json'; //Sets user_data.json to variable "filename"
var fs = require('fs'); //Loads file system
const{request} = require('express');
const { stringify } = require('querystring');

//Processes incoming requests
app.all('*', function (request, response, next) { //for all request methods...
    console.log(request.method + ' to ' + request.path); //generates the request method and its path in the console
    next();
});

app.use(myParser.urlencoded({ extended: true })); //retrieves data from the body 

//Function for processing user logins modified from Lab 14 and class screencasts
if (fs.existsSync(filename)) { //If filename exists...
    stats = fs.statSync(filename) //Get user information from user_data.json file
    console.log(filename + 'has' + stats.size + 'characters'); 
    //Writes character size of file in the console
    data = fs.readFileSync(filename, 'utf-8');
    users_reg_data = JSON.parse(data); //Read existing file and parse user data
  } else { 
    console.log(filename + 'does not exist! Please register.'); //Displays error if file does not exist
  }

//Processes an existing users's login through post method using examples from Lab 14 and screencasts
app.post("/process_login", function (req, res, next) {
    var LogError = [];
    console.log(req.query); //Requests query string
    username = req.body.username.toLowerCase(); //Sets username to all lowercase
    if (typeof users_reg_data[username] != 'undefined') { //If the username data does not equal undefined...
        if (users_reg_data[username].password == req.body.password) {
            req.query.username = username; 
            console.log(users_reg_data[req.query.username].name);
            req.query.name = users_reg_data[req.query.username].name
            res.redirect('/invoice.html?' + qs.stringify(req.query));
            return; //Redirects to invoice if no errors are encountered
        } else { //Invalid password error
            LogError.push = ('Invalid password');
            console.log(LogError);
            req.query.username= username;
            req.query.name= users_reg_data[username].name;
            req.query.LogError=LogError.join(';');
        }
        } else { //Invalid username error
            LogError.push = ('Invalid username');
            console.log(LogError);
            req.query.username= username;
            req.query.LogError=LogError.join(';');
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
    //Requires password length of 6 characters
    if (req.body.password.length < 6) {
      errors.push('Password is too short')
    }
    //Checks to see if passwords match
    if (req.body.password !== req.body.repeat_password) { 
      errors.push('Password is not a match')
    }
    //User's registration is saved in user_data.json if there are no errors
    req.query.fullname = req.body.fullname;
    req.query.username = req.body.username;
    req.query.email = req.body.email; 
    if (errors.length == 0) {
      console.log('No errors')
      var username = req.body.username;
      users_reg_data[username] = {}; //make it 'users'
      users_reg_data[username].name = req.body.name;
      users_reg_data[username].password= req.body.password; 
      users_reg_data[username].email = req.body.email; 
      data = JSON.stringify(users_reg_data); //change to users 
      fs.writeFileSync(filename, data, "utf-8");
      res.redirect('./invoice.html?' + qs.stringify(req.query)); //Redirects to invoice upon successful registration
    }
    //Logs errors in console and redirects to registration page
    else {
      console.log(errors)
        req.query.errors = errors.join(';');
        res.redirect('register.html?' + qs.stringify(req.query)); //Redirects to register.html if there are errors
    }
});

app.post("/process_purchase", function (request, response) {
    let POST = request.body;
    //Checks if quantities are nonnegative integers 
    if (typeof POST['submitPurchase'] != 'undefined') {
      var hasvalidquantities = true; // creating a varibale assuming that it'll be true
      var hasquantities = false
      for (i = 0; i < products.length; i++) {
          qty = POST[`quantity${i}`];
          hasquantities = hasquantities || qty > 0;
          // If quantity value is greater than 0 than the quantity is valid
          hasvalidquantities = hasvalidquantities && isNonNegInt(qty);
      }
      const stringify = qs.stringify(POST); // If all quantities are valid this generates the invoice
      console.log (hasvalidquantities, hasquantities);
      if (hasvalidquantities && hasquantities) {
          response.redirect("./login.html?" + stringify);
          return;
      }
      else {
          response.redirect("./products_display.html?" + stringify)
      }
  }
});

//isNonNegInt function from products_display.html file 
//functions from Lab 12 order_page.html and Assignment 1 examples
function isNonNegInt(q, return_errors = false) { //Function that checks if values are postitive integers
    errors = []; //Assumes no errors at first
    if (q == "") { q = 0; } //Assumes blank inputs as quantity of 0 
    if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); //Checks if string is a number
    else if (q < 0) errors.push('<font color="red">Negative value!</font>'); //Checks if the string non-negative
    else if (parseInt(q) != q) errors.push('<font color="red">Not a full value!</font>'); //Checks if string is an integer
    return return_errors ? errors : (errors.length == 0); //Returns errors
}

app.use(express.static('./public')); //Searches for files in "public" directory
app.listen(8080, () => console.log(`listening on port 8080`)); //Listens for requests on port 8080