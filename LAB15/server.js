var express = require('express');
var app = express();
var myParser = require("body-parser");
var qs = require('qs');
var fs = require('fs');
var cookieParser = require('cookie-parser');

app.use(cookieParser());

//Route to set cookies
app.get("/set_cookie", function (request, response, next) {
    //console.log(request.cookies);
    let my_name = 'Natalie';
    response.cookie('my_name!', my_name, {maxAge: 5*1000}); //Sets cookie to expire in 5 seconds
    response.send(`Cookie for ${my_name} sent`);
    next();
});

//Route to use cookies
app.get("/use_cookie", function (request, response, next) {
    // console.log(request.cookies);
    thename = 'ANONYMOUS';
    if(typeof request.cookies["my_name"] != 'undefined') {
        response.send(`Hello ${request.cookies["my_name"]}!`);    
        } else {
            response.send("I don't know you!");
        }
        next();
    });

//Checks if user_data file exists before reading
var user_data_filename = './user_data.json';
if(fs.existsSync(user_data_filename)) {
    var file_stats = fs.statSync(user_data_filename)
    // console.log(`user_data.json has ${stats['size']} characters`)
    var user_data = JSON.parse(fs.readFileSync(user_data_file, 'utf-8'));
} else {
    console.log(`${user_data_file} does not exist!`);
}

app.all('*', function (request, response, next) {
    console.log(request);
    console.log(req.method, request.path);
    next();
});

//Registering new user
app.post('/process_register', function (request, response) {
    // add a new user to the DB
    username = request.body["uname"];
    user_data[username] = {};
    user_data[username]["password"] = request.body["psw"];
    user_data[username]["email"] = request.body["email"];
    user_data[username]["name"] = request.body["fullname"];
    // save updated user_data to file (DB)
    fs.writeFileSync(user_data_file, JSON.stringify(user_data));
    response.send(`${username} is registered`);
})
// console.log(user_data);

//Creates simple login form
app.get("/login", function (request, response) {
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

//Processes the login form 
app.post('/process_login', function (request, response, next) {
    let username_entered = request.body["uname"];
    let password_entered = request.body["psw"];
    if (typeof user_data[username_entered] != 'undefined') {
        if (user_data[username_entered]['password'] == password_entered) {
            response.send(`${username_entered} is logged in`);
        } else {
            response.send(`${username_entered} password wrong`);
        }
    } else {
        response.send(`${username_entered} not found`);
    }
});

//Processes the login form 
app.post('/process_register', function (request, response, next) {
    response.send(request.body);
});

app.use(express.static('./static'));

app.listen(8080, () => console.log(`listening on port 8080`));
