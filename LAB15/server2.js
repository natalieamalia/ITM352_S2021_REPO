var express = require('express');
var app = express();
var myParser = require("body-parser");
var fs = require('fs');
const { exit } = require('process');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var filename = 'userdata.json';

app.use(cookieParser());
app.use(session({secret: "ITM352 rocks!"}));

app.use(myParser.urlencoded({ extended: true }));

//checks if file exists before reading
if (fs.existsSync(filename)) {
    data = fs.readFileSync(filename, 'utf-8');
    //console.log("Success! We got: " + data);

    user_data = JSON.parse(data);
    //console.log("User_data=", user_data);
} else {
    console.log("Sorry, file" + filename + "not found.");
    exit();
}

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
    //Use set cookie
    if(typeof request.cookies["my_name"] != 'undefined') {
        response.send(`Welcome ${request.cookies["my_name"]}!`);    
        } else {
            response.send("Cookie name undefined!");
        }
        next();
    });

//Route to set session
app.get("/set_session", function (request, response) {
    console.log('session id is' + request.session.id);
    if(typeof request.session.id != 'undefined'){
    response.send(`Welcome, your session ID is ${request.session.id}`);
}
});

//Route to use session
app.get("/use_session", function (request, response) {
    console.log('session id is' + request.session.id);
    if(typeof request.session.id != 'undefined'){
    response.send(`Welcome, your session ID is ${request.session.id}`);
}
});

app.get("/login", function (request, response) {
    //Simple login form
    str = `
<body>
<form action="/login" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/login", function (request, response) {
    // Processes login form using POST method and responds with login message if data is valid, or error message if data is not valid
    console.log("POST login request");
    POST = request.body;
    user_name = POST["username"];
    console.log("User name from form=" + user_name);
    if (user_data[user_name] != undefined) {
        if (typeof request.session.last_login != 'undefined') {
            var msg = `You last logged in at ${request.session.last_login}`;
            var now = new Date();
        } else {
            var msg = '';
            var now = 'This is your first visit!';
        }
        request.session.last_login = now;
        response.cookie('username', user_name).send(`${msg}<BR>${user_name} logged in at ${now}`);
    } else {
        response.send(`Error!`);
    }
});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="/register" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/register", function (request, response) {
    // process a simple register form
    POST = request.body;
    console.log("Got register POST");
    if (POST["username"] != undefined && POST['password'] != undefined) {          // Validate user input
        username = POST["username"];
        user_data[username] = {};
        user_data[username].name = username;
        user_data[username].password = POST['password'];
        user_data[username].email = POST['email'];

        data = JSON.stringify(user_data);
        fs.writeFileSync(filename, data, "utf-8");

        response.send("User " + username + " logged in");
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));