var express = require('express');
var app = express();
var myParser = require("body-parser");
app.use(myParser.urlencoded({ extended: true }));
var qs = require('qs');
var products = require('./product_data.json');

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + 'with query' + JSON.stringify(request.query));
    next(); //Goes to next route after requesting path with query string
});

app.get("/product_data.js", function (request, response, next) {
   var products_str = `var products = ${JSON.stringify(products)};`;
   response.send(products_str);
});

app.get('test.html', function (request, response, next) {
    response.send(`I have a request for /test`); //Sends path location for /test
});

//This processess a form order page
app.post("display_purchase", function (request, response, next) {
    process_quantity_form(request.body, request, response);
    });

app.use(express.static('./public'));

app.listen(8080, function () {
        console.log(`listening on port 8080`)
    }
    );

    document.write(`<h3>${products[0]["model"]} at \$${products[0]["price"]}</h3>`);
    
    function process_quantity_form(post_data, request, response)
    let model = products[0]['model'];
    let model_price = products[0]['price'];
    {
        user_data = {'username':'itm352', 'password':'grader'};
        if(post_data['quantity_textbox']) {
            the_qty = post_data['quantity_textbox'];
            if(isNonNegInt(the_qty)) {
                qstring = qstringify(request.query);
                response.redirect('invoice.html' + qstring + '&quantity_texbox' + the_qty);
                return;
            } else {
                response.redirect('./order_page.html?quantity_textbox' + the_qty);
                return;
            }
        }
    }    