//Natalie's Assignment 1 Kaka'ako Surf Co. server
//Code for server copied from Lab 13 and Assignment 1 examples from when I was an ITM 352 student in Fall 2020
var data = require('./public/products.js'); //sets products.js file and set to variable 'data'
var products = data.products; // sets variable 'products_array' to the products array in the products.js file
var express = require('express'); //begins and caches express module
var app = express(); //set express to variable 'app'
var myParser = require("body-parser"); //loads and chaches body-parser module as variable "myParser"
var qs = require('qs');

//Processes incoming requests
app.all('*', function (request, response, next) { //for all request methods...
    console.log(request.method + ' to ' + request.path); //generates the request method and its path in the console
    next();
});

app.use(myParser.urlencoded({ extended: true })); //retrieves data from the body 

app.post("/process_purchase", function (request, response) {
    let POST = request.body;
    console.log(POST);
    //check if quantities are nonnegative integers 
    if (typeof POST['submitPurchase'] != 'undefined') {
        var hasvalidquantities = true; // creating a varibale assuming that it'll be true
        var hasquantities = false
        for (i = 0; i < products.length; i++) {
            qty = POST[`quantity${i}`];
            hasquantities = hasquantities || qty > 0;
            // If quantity value is greater than 0 than the quantity is valid
            hasvalidquantities = hasvalidquantities && isNonNegInt(qty);
        }
        // If all quantities are valid this generates the invoice
        console.log (hasvalidquantities, hasquantities);
        const stringified = qs.stringify(POST);
        if (hasvalidquantities && hasquantities) {
            response.redirect("./invoice.html?" + stringified);
        }
        else {
            response.redirect("./products_display.html?" + stringified)
        }
    }
});

//repeats isNonNegInt function from products_display.html
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0 };
    if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); //Returns error if string isn't a number
    else if (q < 0) errors.push('<font color="red">Negative value!</font>'); //Returns error if string isn't positive
    else if (parseInt(q) != q) errors.push('<font color="red">Not a full value!</font>'); //Returns error if string isn't an integer
    return returnErrors ? errors : (errors.length == 0);
}

app.use(express.static('./public')); //Searches for files in "public" directory
app.listen(8080, () => console.log(`listening on port 8080`)); //Listens for requests on port 8080