var express = require('express');
var app = express();
var myParser = require("body-parser");
app.use(myParser.urlencoded({ extended: true }));
var qs = require('qs');
var fs = require('fs');
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//Route to get cookies
app.get('set_cookie', function (request, response, next) {
    //console.log(request.cookies);
    let my_name = 'Natalie';
    response.cookie('my_name', my_name);
    response.send(`Cokkie for ${my_name} was sent.`)
    next(); //Goes to next route after requesting path with query string
});

//user_data = require('user_data.json')
//console.log(user_data['dport']['password']);
//Reads user data file
var user_data_file = 'user_data.json';
//check if file exists before reading it 
if( fs.existsSync(user_data_filename)) {
    stats= fs.startSync(user_data_filename);
    console.log(`user_data.json has ${stats['size']} characters `);
var data = fs.readFileSync(user_data_filename, 'utf-8');
user_reg_data = JSON.parse(data);
if (typeof user_reg_data ['itm 352'] !='undefined') { console.log (users_rega_data ['itm352']['password']=='xxx');
}
} else {
    console.log(`ERR: ${user_data_filename} does not exist!!!`)
};

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + 'with query' + JSON.stringify(request.query));
    next(); //Goes to next route after requesting path with query string
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